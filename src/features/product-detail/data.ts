import "server-only";

import {
  getCachedApiProduct,
  getCachedSimilarProducts
} from "@/features/product-detail/cached";
import { ProductNotFoundError } from "@/lib/errors";
import { mapApiToDetail } from "@/services/product.mapper";

const SIMILAR_LIMIT = 12;

export const getProductDetailPageData = async (id: string | undefined) => {
  const productId = id?.trim();
  if (!productId) {
    throw new ProductNotFoundError("");
  }

  const api = await getCachedApiProduct(productId);
  if (!api) {
    throw new ProductNotFoundError(productId);
  }

  const similarProducts = await getCachedSimilarProducts(
    api.category,
    productId,
    SIMILAR_LIMIT
  );

  return {
    productId,
    product: mapApiToDetail(api),
    similarProducts
  };
};

export type ProductDetailPageData = Awaited<
  ReturnType<typeof getProductDetailPageData>
>;
