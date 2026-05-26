import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
  buildCsvParam,
  parseSearchParams,
  SEARCH_PAGE_LIMIT,
  type SearchParamsState
} from "@/features/search/query/search-query-params";
import { productService } from "@/services/product.service";

const getCachedSearchResults = async (filters: SearchParamsState) => {
  "use cache";
  cacheLife("minutes");
  cacheTag("products", "search");

  const offset = (filters.page - 1) * SEARCH_PAGE_LIMIT;
  return productService.searchProducts({
    q: filters.searchQuery,
    category: buildCsvParam(filters.selectedCategories),
    brand: buildCsvParam(filters.selectedBrands),
    priceMin: filters.priceRange[0] ?? undefined,
    priceMax: filters.priceRange[1] ?? undefined,
    limit: SEARCH_PAGE_LIMIT,
    offset
  });
};

/** Pass a URLSearch-style string ("?a=b"). */
export const getSearchPageData = async (searchString: string) => {
  const filters = parseSearchParams(searchString);
  const result = await getCachedSearchResults(filters);
  return { filters, result };
};

export type SearchPageData = Awaited<ReturnType<typeof getSearchPageData>>;
