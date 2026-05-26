import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatRsdPrice } from "@/services/price.formatter";
import type { ProductSummary } from "@/types/product.types";

type Props = { product: ProductSummary; priority?: boolean };

export const ProductCard = ({ product, priority = false }: Props) => (
  <Link
    href={`/product/${product.id}`}
    className="block overflow-hidden rounded-lg border border-slate-200 bg-white p-3 hover:shadow-sm"
  >
    <Image
      src={product.thumbnailUrl}
      alt={product.title}
      width={320}
      height={180}
      priority={priority}
      className="h-[180px] w-full rounded-md object-cover"
      sizes="(max-width: 768px) 100vw, 33vw"
    />
    <h3 className="mt-3 text-sm font-semibold text-slate-900">
      {product.title}
    </h3>
    <div className="mt-2 flex items-center justify-between">
      <Badge>{product.category}</Badge>
      <span className="text-sm font-medium text-slate-800">
        {formatRsdPrice(product.price)}
      </span>
    </div>
  </Link>
);
