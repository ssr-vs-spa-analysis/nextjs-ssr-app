import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { productsRepository } from "@/db/products.repository";
import { productService } from "@/services/product.service";

export const getCachedApiProduct = async (id: string) => {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${id}`);
  return productsRepository.findById(id);
};

export const getCachedSimilarProducts = async (
  category: string,
  excludeId: string,
  limit: number
) => {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `similar:${category}`);
  return productService.listSimilar(category, excludeId, limit);
};
