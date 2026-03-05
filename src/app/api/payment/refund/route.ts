import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createRefund } from "@/lib/razorpay";
import { revalidatePath } from "next/cache";
import { cancelOrderReservations } from "@/lib/availability";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, reason, isVendor } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    // Get order with payment details
    let order;

    if (isVendor) {
      // Vendor cancellation - verify vendor owns products in order
      const vendorProducts = await db.product.findMany({
        where: { vendorId: session.user.id },
        select: { id: true },
      });
      const productIds = vendorProducts.map((p) => p.id);

      order = await db.rentalOrder.findFirst({
        where: {
          id: orderId,
          items: {
            some: {
              productId: { in: productIds },
            },
          },
        },
        include: {
          payments: {
            where: { status: "COMPLETED" },
            orderBy: { createdAt: "desc" },
          },
          items: true,
        },
      });
    } else {
      // Customer cancellation
      order = await db.rentalOrder.findFirst({
        where: {
          id: orderId,
          customerId: session.user.id,
        },
        include: {
          payments: {
            where: { status: "COMPLETED" },
            orderBy: { createdAt: "desc" },
          },
          items: true,
        },
      });
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if order can be cancelled
    if (!["DRAFT", "CONFIRMED"].includes(order.status)) {
      return NextResponse.json(
        { error: "Order cannot be cancelled at this stage" },
        { status: 400 },
      );
    }

    // Find the payment with transaction ID (Razorpay payment)
    const payment = order.payments.find((p) => p.transactionId);

    if (!payment || !payment.transactionId) {
      // No Razorpay payment found, just cancel the order
      await db.rentalOrder.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          notes: reason ? `Cancellation reason: ${reason}` : order.notes,
        },
      });

      // Cancel reservations
      await cancelOrderReservations(orderId);

      revalidatePath("/orders");
      revalidatePath(`/orders/${orderId}`);

      return NextResponse.json({
        success: true,
        message: "Order cancelled successfully",
        refund: null,
      });
    }

    // Validate that transactionId is a Razorpay payment ID (starts with 'pay_')
    if (!payment.transactionId.startsWith("pay_")) {
      console.error(
        `Invalid transactionId format: ${payment.transactionId}. Expected Razorpay payment ID starting with 'pay_'`,
      );
      // Cancel the order without refund
      await db.rentalOrder.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          notes: reason
            ? `Cancellation reason: ${reason}. Manual refund required - invalid payment reference.`
            : "Manual refund required - invalid payment reference.",
        },
      });
      await cancelOrderReservations(orderId);
      revalidatePath("/orders");
      revalidatePath(`/orders/${orderId}`);
      return NextResponse.json(
        {
          error:
            "Order cancelled, but automatic refund could not be processed. Please contact support for a manual refund.",
          orderId: order.id,
          cancelled: true,
        },
        { status: 200 },
      );
    }

    // Calculate refund amount (could be partial based on business logic)
    const refundAmount = Number(payment.amount);

    try {
      // Create refund in Razorpay
      const refund = await createRefund({
        paymentId: payment.transactionId,
        amount: Math.round(refundAmount * 100), // Convert to paise
        notes: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          reason: reason || "Customer requested cancellation",
        },
        speed: "normal",
      });

      // Update payment status
      await db.payment.update({
        where: { id: payment.id },
        data: {
          status: "REFUNDED",
          notes: `Refund ID: ${refund.id}. ${reason || ""}`,
        },
      });

      // Create a refund payment record
      const refundPaymentCount = await db.payment.count();
      const refundPaymentNumber = `REF-${new Date().getFullYear()}-${String(refundPaymentCount + 1).padStart(6, "0")}`;

      await db.payment.create({
        data: {
          paymentNumber: refundPaymentNumber,
          orderId: order.id,
          customerId: session.user.id,
          amount: -refundAmount, // Negative amount for refund
          paymentType: "FULL_PAYMENT",
          status: "COMPLETED",
          paymentMethod: "razorpay_refund",
          transactionId: refund.id,
          gatewayResponse: refund as any,
          paidAt: new Date(),
          notes: `Refund for payment ${payment.paymentNumber}. ${reason || ""}`,
        },
      });

      // Update order status
      await db.rentalOrder.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          paidAmount: 0,
          notes: reason
            ? `Cancellation reason: ${reason}. Refund ID: ${refund.id}`
            : `Refund ID: ${refund.id}`,
        },
      });

      // Cancel reservations
      await cancelOrderReservations(orderId);

      revalidatePath("/orders");
      revalidatePath(`/orders/${orderId}`);

      return NextResponse.json({
        success: true,
        message: "Order cancelled and refund initiated",
        refund: {
          id: refund.id,
          amount: refundAmount,
          status: refund.status,
        },
      });
    } catch (refundError: any) {
      // Log full Razorpay error details for debugging
      console.error("Razorpay refund failed:", {
        message: refundError?.message,
        code: refundError?.error?.code,
        description: refundError?.error?.description,
        field: refundError?.error?.field,
        source: refundError?.error?.source,
        step: refundError?.error?.step,
        reason: refundError?.error?.reason,
        paymentId: payment.transactionId,
        orderId: order.id,
      });

      // Still cancel the order and flag for manual refund
      await db.rentalOrder.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          notes: reason
            ? `Cancellation reason: ${reason}. Auto-refund failed - manual refund required. Payment: ${payment.transactionId}`
            : `Auto-refund failed - manual refund required. Payment ID: ${payment.transactionId}`,
        },
      });

      await db.payment.update({
        where: { id: payment.id },
        data: {
          notes: `Refund attempted but failed: ${refundError?.error?.description || refundError?.message}. Manual refund required.`,
        },
      });

      await cancelOrderReservations(orderId);
      revalidatePath("/orders");
      revalidatePath(`/orders/${orderId}`);

      return NextResponse.json(
        {
          error:
            "Order cancelled, but automatic refund could not be processed. Please contact support with your order number for a manual refund.",
          orderId: order.id,
          cancelled: true,
        },
        { status: 200 },
      );
    }
  } catch (error: any) {
    console.error("Error processing refund:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process refund" },
      { status: 500 },
    );
  }
}
