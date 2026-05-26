import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

type Props = {
  count: number;
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3";

export const ProductCardSkeletonGrid = ({
  count,
  className = DEFAULT_CLASS_NAME
}: Props) => (
  <section className={className}>
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </section>
);
