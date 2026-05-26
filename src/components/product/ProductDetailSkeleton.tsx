import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailBlockSkeleton = () => (
  <section className="grid grid-cols-1 gap-6 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
    <Skeleton className="h-[320px] w-full rounded-md" />
    <div>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-11/12" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <div className="mt-4 flex items-center gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-6 h-7 w-32" />
      <Skeleton className="mt-2 h-4 w-40" />
    </div>
  </section>
);

export const SimilarProductsRowSkeleton = () => (
  <section className="space-y-3" aria-label="Slični proizvodi skeleton">
    <Skeleton className="h-7 w-52" />
    <div className="-mx-1 overflow-x-auto pb-4">
      <div className="flex min-w-max gap-4 px-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <article
            key={index}
            className="w-[240px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-3"
          >
            <Skeleton className="h-[180px] w-full rounded-md" />
            <Skeleton className="mt-3 h-4 w-10/12" />
            <div className="mt-2 flex items-center justify-between gap-3">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const ProductDetailSkeleton = () => (
  <div className="space-y-8">
    <ProductDetailBlockSkeleton />
    <SimilarProductsRowSkeleton />
  </div>
);
