import { VendorProductForm } from "@/components/vendor/VendorProductForm";

export default function AdminNewProductPage() {
  return (
    <VendorProductForm
      backHref="/admin/products"
      redirectHref="/admin/products"
    />
  );
}
