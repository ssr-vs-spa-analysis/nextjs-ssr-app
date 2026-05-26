import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { getCachedApiProduct } from "@/features/product-detail/cached";
import { mapApiToDetail } from "@/services/product.mapper";

type Props = { id: string };

export const ProductDetailMain = async ({ id }: Props) => {
  const api = await getCachedApiProduct(id.trim());
  if (!api) {
    notFound();
  }

  return <ProductDetailView product={mapApiToDetail(api)} />;
};
