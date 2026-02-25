import Razorpay from "razorpay";
import crypto from "crypto";

// Lazily initialize Razorpay so missing keys don't crash the module
function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay keys are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file."
    );
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export interface CreateOrderOptions {
  amount: number; // Amount in paise (multiply INR by 100)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface VerifyPaymentOptions {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RefundOptions {
  paymentId: string;
  amount?: number; // Amount in paise, if not provided full refund
  notes?: Record<string, string>;
  speed?: "normal" | "optimum";
}

export interface RazorpayRefund {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  payment_id: string;
  notes: Record<string, string>;
  receipt: string | null;
  acquirer_data: Record<string, string>;
  created_at: number;
  status: string;
  speed_processed: string;
  speed_requested: string;
}

// Create a Razorpay order
export async function createRazorpayOrder(
  options: CreateOrderOptions,
): Promise<RazorpayOrder> {
  try {
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: options.amount,
      currency: options.currency || "INR",
      receipt: options.receipt,
      notes: options.notes || {},
    });
    return order as RazorpayOrder;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create payment order");
  }
}

// Verify payment signature
export function verifyPaymentSignature(options: VerifyPaymentOptions): boolean {
  try {
    const body = options.razorpay_order_id + "|" + options.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    return expectedSignature === options.razorpay_signature;
  } catch (error) {
    console.error("Error verifying payment signature:", error);
    return false;
  }
}

// Get payment details
export async function getPaymentDetails(paymentId: string) {
  try {
    const payment = await getRazorpayInstance().payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw new Error("Failed to fetch payment details");
  }
}

// Create refund for a payment
export async function createRefund(
  options: RefundOptions,
): Promise<RazorpayRefund> {
  try {
    const refundOptions: any = {
      speed: options.speed || "normal",
      notes: options.notes || {},
    };

    // If amount is provided, it's a partial refund
    if (options.amount) {
      refundOptions.amount = options.amount;
    }

    const refund = await getRazorpayInstance().payments.refund(
      options.paymentId,
      refundOptions,
    );
    return refund as RazorpayRefund;
  } catch (error: any) {
    console.error("Error creating refund:", error);
    throw new Error(error?.error?.description || "Failed to create refund");
  }
}

// Get refund status
export async function getRefundStatus(paymentId: string, refundId: string) {
  try {
    const refund = await getRazorpayInstance().payments.fetchRefund(paymentId, refundId);
    return refund;
  } catch (error) {
    console.error("Error fetching refund status:", error);
    throw new Error("Failed to fetch refund status");
  }
}

// Get all refunds for a payment
export async function getPaymentRefunds(paymentId: string) {
  try {
    const refunds = await getRazorpayInstance().payments.fetchMultipleRefund(paymentId, {});
    return refunds;
  } catch (error) {
    console.error("Error fetching payment refunds:", error);
    throw new Error("Failed to fetch refunds");
  }
}

export default razorpay;
