import { z } from "zod";
import {
  SEARCH_BRAND_OPTIONS,
  SEARCH_CATEGORY_OPTIONS
} from "@/constants/search-filters";
import { splitCommaSeparated } from "@/lib/strings";

export type SearchParamsState = {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number | null, number | null];
  page: number;
};

export const SEARCH_PAGE_LIMIT = 24;

export const DEFAULT_SEARCH_PRICE_RANGE: [number | null, number | null] = [
  null,
  null
];

const searchParamsSchema = z.object({
  q: z.string().trim().catch(""),
  categories: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).catch(1)
});

const matchOption = <T extends string>(
  options: readonly T[],
  token: string
): T | null =>
  options.find((item) => item.toLowerCase() === token.toLowerCase()) ?? null;

export const buildCsvParam = (values: string[]): string | undefined =>
  values.length === 0
    ? undefined
    : [...new Set(values)]
        .sort((a, b) => a.localeCompare(b))
        .map((value) => value.toLowerCase())
        .join(",");

const parseMinPrice = (raw: string | null): number | null => {
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return null;
  return Math.max(0, Math.floor(parsed));
};

const parseMaxPrice = (raw: string | null): number | null => {
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return Math.floor(parsed);
};

const orderPriceRange = (
  min: number | null,
  max: number | null
): [number | null, number | null] =>
  min !== null && max !== null && min > max ? [max, min] : [min, max];

export const parseSearchParams = (search: string): SearchParamsState => {
  const urlParams = new URLSearchParams(search);
  const params = searchParamsSchema.parse({
    q: urlParams.get("q") ?? "",
    categories: urlParams.get("categories") ?? undefined,
    brand: urlParams.get("brand") ?? undefined,
    page: urlParams.get("page") ?? undefined
  });

  const normalizedRange = orderPriceRange(
    parseMinPrice(urlParams.get("price_min")),
    parseMaxPrice(urlParams.get("price_max"))
  );

  const selectedCategories: string[] = params.categories
    ? splitCommaSeparated(params.categories)
        .map((token) => matchOption(SEARCH_CATEGORY_OPTIONS, token))
        .filter((value) => value !== null)
    : [];

  const selectedBrands: string[] = params.brand
    ? splitCommaSeparated(params.brand)
        .map((token) => matchOption(SEARCH_BRAND_OPTIONS, token))
        .filter((value) => value !== null)
    : [];

  return {
    searchQuery: params.q,
    selectedCategories,
    selectedBrands,
    priceRange: normalizedRange,
    page: params.page
  };
};

export const toSearchParams = (state: SearchParamsState): string => {
  const params = new URLSearchParams();
  const normalizedQuery = state.searchQuery.trim();
  const categoriesValue = buildCsvParam(state.selectedCategories);
  const brandValue = buildCsvParam(state.selectedBrands);
  const minPrice =
    state.priceRange[0] === null
      ? null
      : Math.max(0, Math.floor(state.priceRange[0]));
  const maxPrice =
    state.priceRange[1] === null || state.priceRange[1] <= 0
      ? null
      : Math.floor(state.priceRange[1]);
  const [normalizedMin, normalizedMax] = orderPriceRange(minPrice, maxPrice);

  if (normalizedQuery) params.set("q", normalizedQuery);
  if (categoriesValue) params.set("categories", categoriesValue);
  if (brandValue) params.set("brand", brandValue);
  if (normalizedMin !== null) params.set("price_min", String(normalizedMin));
  if (normalizedMax !== null) params.set("price_max", String(normalizedMax));
  params.set("page", String(Math.max(1, state.page)));

  return params.toString();
};

export const searchParamsToString = (
  resolved: Record<string, string | string[] | undefined>
): string => {
  const params = new URLSearchParams();

  Object.entries(resolved).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry));
      return;
    }
    if (value !== undefined) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `?${query}` : "";
};
