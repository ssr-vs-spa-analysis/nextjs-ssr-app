import { connection } from "next/server";
import type { Metadata } from "next";
import { SearchFiltersShell } from "@/components/product/SearchFiltersShell";
import { SearchResultsGrid } from "@/components/product/SearchResultsGrid";
import { getSearchPageData } from "@/features/search/data";
import {
  SEARCH_PAGE_LIMIT,
  searchParamsToString
} from "@/features/search/query/search-query-params";

export const metadata: Metadata = {
  title: "Pretraga proizvoda | eProdavnica",
  description:
    "Pretraži proizvode po nazivu, kategoriji, brendu i opsegu cene.",
  robots: { index: false, follow: true }
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const SearchPage = async ({ searchParams }: Props) => {
  await connection();

  const resolved = await searchParams;
  const searchString = searchParamsToString(resolved);

  const data = await getSearchPageData(searchString);
  const totalPages = Math.max(
    1,
    Math.ceil(data.result.total / SEARCH_PAGE_LIMIT)
  );

  return (
    <SearchFiltersShell filters={data.filters} totalPages={totalPages}>
      <SearchResultsGrid items={data.result.items} />
    </SearchFiltersShell>
  );
};

export default SearchPage;
