import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeaturedProductsSection } from "@/components/product/FeaturedProductsSection";
import { HomeSearchBar } from "@/components/product/HomeSearchBar";
import { ProductCardSkeletonGrid } from "@/components/product/ProductCardSkeletonGrid";

export const metadata: Metadata = {
  title: "Početna | eProdavnica",
  description:
    "Preporučeni proizvodi i pretraga po kategorijama, brendovima i ceni."
};

const HomePage = async () => {
  await connection();

  return (
    <div className="space-y-6">
      <HeroSection />
      <HomeSearchBar />
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Preporučeni proizvodi
        </h2>

        <Suspense fallback={<ProductCardSkeletonGrid count={6} />}>
          <FeaturedProductsSection />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;
