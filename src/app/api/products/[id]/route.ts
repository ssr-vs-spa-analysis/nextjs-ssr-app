import { NextResponse } from "next/server";
import { getProductDetailPageData } from "@/features/product-detail/data";
import { ProductNotFoundError } from "@/lib/errors";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = async (_request: Request, { params }: RouteParams) => {
  const { id } = await params;

  try {
    const data = await getProductDetailPageData(id);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
};
