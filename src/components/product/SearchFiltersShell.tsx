"use client";

import {
  useCallback,
  useEffect,
  useState,
  useTransition,
  type ReactNode
} from "react";
import { useRouter } from "next/navigation";
import { ProductCardSkeletonGrid } from "@/components/product/ProductCardSkeletonGrid";
import { ProductSearchInput } from "@/components/product/ProductSearchInput";
import { SearchFiltersPanel } from "@/components/product/SearchFiltersPanel";
import { Button } from "@/components/ui/button";
import {
  type SearchParamsState,
  toSearchParams
} from "@/features/search/query/search-query-params";

const SEARCH_DEBOUNCE_MS = 300;
const RESULTS_GRID_CLASS_NAME = "grid grid-cols-1 gap-4 md:grid-cols-3";
const RESULTS_SKELETON_COUNT = 9;

type PaginationItem = number | "ellipsis";

type Props = {
  filters: SearchParamsState;
  totalPages: number;
  children: ReactNode;
};

const buildPaginationItems = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages
  ];
};

export const SearchFiltersShell = ({
  filters,
  totalPages,
  children
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [lastSyncedQuery, setLastSyncedQuery] = useState(filters.searchQuery);

  // Re-sync local input when URL changes externally, unless user has typed since.
  if (filters.searchQuery !== lastSyncedQuery) {
    setLastSyncedQuery(filters.searchQuery);
    if (lastSyncedQuery === searchInput) {
      setSearchInput(filters.searchQuery);
    }
  }

  const pushParams = useCallback(
    (next: Partial<SearchParamsState>, nextPage = 1) => {
      const targetState: SearchParamsState = {
        ...filters,
        searchQuery: searchInput.trim(),
        ...next,
        page: nextPage
      };
      const search = toSearchParams(targetState);
      startTransition(() => {
        router.replace(`/search?${search}`);
      });
    },
    [filters, router, searchInput]
  );

  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === filters.searchQuery) return;

    const timeoutId = window.setTimeout(() => {
      pushParams({ searchQuery: trimmed });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput, filters.searchQuery, pushParams]);

  const handleCategoryToggle = (value: string, checked: boolean) => {
    const next = checked
      ? [...filters.selectedCategories, value]
      : filters.selectedCategories.filter((entry) => entry !== value);
    pushParams({ selectedCategories: [...new Set(next)] });
  };

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const next = isSelected
      ? filters.selectedBrands.filter((entry) => entry !== brand)
      : [...filters.selectedBrands, brand];
    pushParams({ selectedBrands: [...new Set(next)] });
  };

  const handlePriceRangeChange = (value: [number | null, number | null]) => {
    pushParams({ priceRange: value });
  };

  const handleGoToPage = (page: number) => {
    pushParams({}, page);
  };

  const currentPage = filters.page;
  const paginationItems = buildPaginationItems(currentPage, totalPages);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20%_80%]">
      <ProductSearchInput
        value={searchInput}
        onChange={setSearchInput}
        cardClassName="lg:col-span-2"
        id="search-page-product-search"
      />

      <SearchFiltersPanel
        selectedCategories={filters.selectedCategories}
        selectedBrands={filters.selectedBrands}
        priceRange={filters.priceRange}
        onCategoryToggle={handleCategoryToggle}
        onBrandToggle={handleBrandToggle}
        onPriceRangeChange={handlePriceRangeChange}
      />

      <div className="space-y-4 lg:min-h-0">
        <div
          className="hide-scrollbar lg:max-h-[calc(100vh+40px)] lg:min-h-[calc(100vh+40px)] lg:overflow-y-auto lg:pr-2"
          aria-busy={isPending}
          aria-live="polite"
        >
          {isPending ? (
            <ProductCardSkeletonGrid
              count={RESULTS_SKELETON_COUNT}
              className={RESULTS_GRID_CLASS_NAME}
            />
          ) : (
            children
          )}
        </div>
      </div>

      <div className="w-full lg:col-span-2">
        <nav
          className="flex w-full flex-wrap items-center justify-center gap-2"
          aria-label="Paginacija rezultata"
        >
          <Button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handleGoToPage(currentPage - 1)}
          >
            Prethodna strana
          </Button>

          {paginationItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-slate-500"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = item === currentPage;
            return (
              <Button
                key={item}
                type="button"
                onClick={() => handleGoToPage(item)}
                className={
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }
                aria-current={isActive ? "page" : undefined}
              >
                {item}
              </Button>
            );
          })}

          <Button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handleGoToPage(currentPage + 1)}
          >
            Sledeća strana
          </Button>
        </nav>
      </div>
    </div>
  );
};
