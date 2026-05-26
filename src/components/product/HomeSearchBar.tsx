"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductSearchInput } from "@/components/product/ProductSearchInput";
import {
  DEFAULT_SEARCH_PRICE_RANGE,
  toSearchParams
} from "@/features/search/query/search-query-params";

export const HomeSearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleHomeSearchSubmit = () => {
    const search = toSearchParams({
      searchQuery: searchQuery.trim(),
      selectedCategories: [],
      selectedBrands: [],
      priceRange: DEFAULT_SEARCH_PRICE_RANGE,
      page: 1
    });

    router.push(`/search?${search}`);
  };

  return (
    <ProductSearchInput
      value={searchQuery}
      onChange={setSearchQuery}
      onSubmit={handleHomeSearchSubmit}
      id="home-product-search"
    />
  );
};
