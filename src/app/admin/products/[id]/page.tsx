"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { VendorProductForm } from "@/components/vendor/VendorProductForm";
import { getVendorProductById } from "@/actions/vendor";
import { toast } from "sonner";

export default function AdminEditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getVendorProductById(params.id as string);
        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          toast.error("Product not found");
          router.push("/admin/products");
        }
      } catch (error) {
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <VendorProductForm
      initialData={product}
      isEditMode={true}
      backHref="/admin/products"
      redirectHref="/admin/products"
    />
  );
}
