import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => (
  <article className="rounded-lg border border-slate-200 bg-white p-3">
    <Skeleton className="h-[180px] w-full" />
    <Skeleton className="mt-3 h-4 w-2/3" />
    <Skeleton className="mt-2 h-4 w-1/3" />
  </article>
);
