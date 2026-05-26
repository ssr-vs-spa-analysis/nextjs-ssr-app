"use client";

import { RouteErrorView } from "@/components/layout/RouteErrorView";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ProductDetailError = ({ error, reset }: Props) => (
  <RouteErrorView
    heading="Neuspešno učitavanje detalja proizvoda."
    error={error}
    reset={reset}
  />
);

export default ProductDetailError;
