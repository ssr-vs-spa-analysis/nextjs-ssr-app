import { NextResponse } from "next/server";
import { productService } from "@/services/product.service";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const limitRaw = url.searchParams.get("limit");
  const parsed = Number(limitRaw);
  const limit = Number.isFinite(parsed) && parsed > 0 ? parsed : 12;

  try {
    const items = await productService.listFeatured(limit);
    return NextResponse.json({ items, total: items.length, limit, offset: 0 });
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
};
