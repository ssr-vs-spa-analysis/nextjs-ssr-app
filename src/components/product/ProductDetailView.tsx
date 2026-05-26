import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatRsdPrice } from "@/services/price.formatter";
import type { ProductDetail } from "@/types/product.types";

type Props = { product: ProductDetail };

const stockStatusLabels: Record<ProductDetail["stockStatus"], string> = {
  na_stanju: "Na stanju",
  niske_zalihe: "Niske zalihe",
  nema_na_stanju: "Nema na stanju"
};

export const ProductDetailView = ({ product }: Props) => (
  <section className="grid grid-cols-1 gap-6 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
    <Image
      src={product.imageUrl}
      alt={product.title}
      width={640}
      height={320}
      priority
      className="h-[320px] w-full rounded-md object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />

    <div>
      <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
      <p className="mt-3 text-slate-700">{product.description}</p>
      <div className="mt-4 flex items-center gap-2">
        <Badge>{product.category}</Badge>
        <Badge>{product.brand}</Badge>
      </div>
      <p className="mt-6 text-xl font-semibold text-slate-900">
        {formatRsdPrice(product.price)}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Stanje: {stockStatusLabels[product.stockStatus]}
      </p>
    </div>
  </section>
);
