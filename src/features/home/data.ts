import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { productService } from "@/services/product.service";

export const getHomePageData = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("products", "featured-products");

  const featuredProducts = await productService.listFeatured(12);
  return { featuredProducts };
};

export type HomePageData = Awaited<ReturnType<typeof getHomePageData>>;
