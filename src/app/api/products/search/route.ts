import { NextResponse } from "next/server";
import { getSearchPageData } from "@/features/search/data";

export const GET = async (request: Request) => {
  const url = new URL(request.url);

  try {
    const data = await getSearchPageData(url.search);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
};
