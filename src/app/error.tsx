"use client";

import { RouteErrorView } from "@/components/layout/RouteErrorView";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RouteErrorBoundary = ({ error, reset }: Props) => (
  <RouteErrorView
    heading="Došlo je do greške pri učitavanju stranice."
    error={error}
    reset={reset}
  />
);

export default RouteErrorBoundary;
