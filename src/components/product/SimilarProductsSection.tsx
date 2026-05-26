import { ProductCard } from "@/components/product/ProductCard";
import {
  getCachedApiProduct,
  getCachedSimilarProducts
} from "@/features/product-detail/cached";

const SIMILAR_LIMIT = 12;

type Props = { id: string };

export const SimilarProductsSection = async ({ id }: Props) => {
  const api = await getCachedApiProduct(id.trim());
  if (!api) {
    return null;
  }

  const similarProducts = await getCachedSimilarProducts(
    api.category,
    api.id,
    SIMILAR_LIMIT
  );

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3" aria-label="Slični proizvodi">
      <h2 className="text-xl font-semibold text-slate-900">Slični proizvodi</h2>
      <div className="-mx-1 overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4 px-1">
          {similarProducts.map((similar) => (
            <div key={similar.id} className="w-[240px] shrink-0">
              <ProductCard product={similar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
