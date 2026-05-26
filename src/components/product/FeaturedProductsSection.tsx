import { ProductCard } from "@/components/product/ProductCard";
import { getHomePageData } from "@/features/home/data";

export const FeaturedProductsSection = async () => {
  const { featuredProducts } = await getHomePageData();

  if (!featuredProducts.length) {
    return (
      <p className="text-sm text-slate-600">Nema preporučenih proizvoda.</p>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {featuredProducts.map((item, index) => (
        <ProductCard key={item.id} product={item} priority={index === 0} />
      ))}
    </section>
  );
};
