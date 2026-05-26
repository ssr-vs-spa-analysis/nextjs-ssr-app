import { ProductCardSkeletonGrid } from "@/components/product/ProductCardSkeletonGrid";
import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => (
  <div className="space-y-6">
    <Skeleton className="h-40 w-full rounded-xl" />
    <Skeleton className="h-11 w-full" />
    <section>
      <Skeleton className="mb-4 h-7 w-64" />
      <ProductCardSkeletonGrid count={6} />
    </section>
  </div>
);

export default HomeLoading;
