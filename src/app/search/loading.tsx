import { ProductCardSkeletonGrid } from "@/components/product/ProductCardSkeletonGrid";
import { Skeleton } from "@/components/ui/skeleton";

const SEARCH_RESULTS_GRID_CLASS = "grid grid-cols-1 gap-4 md:grid-cols-3";

const SearchLoading = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20%_80%]">
    <Skeleton className="h-11 w-full lg:col-span-2" />

    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <Skeleton className="mb-3 h-6 w-32" />
      <Skeleton className="h-56 w-full" />
    </div>

    <ProductCardSkeletonGrid count={9} className={SEARCH_RESULTS_GRID_CLASS} />
  </div>
);

export default SearchLoading;
