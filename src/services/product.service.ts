import { productsRepository } from "@/db/products.repository";
import { mapApiToSummary } from "@/services/product.mapper";
import type { ProductSummary } from "@/types/product.types";

export const productService = {
  async listFeatured(limit = 12): Promise<ProductSummary[]> {
    const items = await productsRepository.listFeatured(limit);
    return items.map(mapApiToSummary);
  },

  async listSimilar(
    category: string,
    excludeId: string,
    limit: number
  ): Promise<ProductSummary[]> {
    const items = await productsRepository.listSimilar(
      category,
      excludeId,
      limit
    );

    return items.map(mapApiToSummary);
  },

  async searchProducts(params: {
    q?: string;
    category?: string;
    brand?: string;
    priceMin?: number;
    priceMax?: number;
    limit?: number;
    offset?: number;
  }): Promise<{
    items: ProductSummary[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const limit = params.limit ?? 24;
    const offset = params.offset ?? 0;
    const { items, total } = await productsRepository.search({
      q: params.q,
      category: params.category,
      brand: params.brand,
      priceMin: params.priceMin,
      priceMax: params.priceMax,
      limit,
      offset
    });

    return {
      items: items.map(mapApiToSummary),
      total,
      limit,
      offset
    };
  }
};
