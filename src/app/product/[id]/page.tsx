import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductDetailMain } from "@/components/product/ProductDetailMain";
import {
  ProductDetailBlockSkeleton,
  SimilarProductsRowSkeleton
} from "@/components/product/ProductDetailSkeleton";
import { SimilarProductsSection } from "@/components/product/SimilarProductsSection";
import { getCachedApiProduct } from "@/features/product-detail/cached";

type Props = { params: Promise<{ id: string }> };

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 3)}...` : text;

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  await connection();
  const { id } = await params;
  const api = await getCachedApiProduct(id.trim());
  if (!api) {
    return { title: "Proizvod | eProdavnica" };
  }

  return {
    title: `${api.name} | eProdavnica`,
    description: truncate(api.description, 160),
    openGraph: {
      title: api.name,
      description: truncate(api.description, 200),
      images: api.images[0]
        ? [{ url: api.images[0], width: 600, height: 600 }]
        : undefined
    }
  };
};

const ProductDetailPage = async ({ params }: Props) => {
  await connection();
  const { id } = await params;

  return (
    <div className="space-y-8">
      <Suspense fallback={<ProductDetailBlockSkeleton />}>
        <ProductDetailMain id={id} />
      </Suspense>
      <Suspense fallback={<SimilarProductsRowSkeleton />}>
        <SimilarProductsSection id={id} />
      </Suspense>
    </div>
  );
};

export default ProductDetailPage;
