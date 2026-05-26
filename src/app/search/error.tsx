"use client";

import { RouteErrorView } from "@/components/layout/RouteErrorView";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const SearchError = ({ error, reset }: Props) => (
  <RouteErrorView
    heading="Došlo je do greške pri učitavanju pretrage."
    error={error}
    reset={reset}
  />
);

export default SearchError;
