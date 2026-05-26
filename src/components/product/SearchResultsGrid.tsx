import { ProductCard } from "@/components/product/ProductCard";
import type { ProductSummary } from "@/types/product.types";

type Props = {
  items: ProductSummary[];
};

export const SearchResultsGrid = ({ items }: Props) => {
  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        Nema proizvoda koji odgovaraju trenutnim filterima.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </section>
  );
};
