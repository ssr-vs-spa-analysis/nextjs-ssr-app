import "server-only";

import type { Prisma, Product } from "@prisma/client/index";
import { prisma } from "@/db/prisma";
import { splitCommaSeparated } from "@/lib/strings";
import { apiProductSchema } from "@/schemas/product.schema";
import type { ApiProduct } from "@/types/product.types";

type StringField = "category" | "brand";

const buildCaseInsensitiveCondition = (
  field: StringField,
  rawValue: string | undefined
): Prisma.ProductWhereInput | null => {
  const unique = [...new Set(splitCommaSeparated(rawValue))];
  if (unique.length === 0) return null;

  return {
    OR: unique.map((value) => ({
      [field]: { equals: value, mode: "insensitive" }
    }))
  };
};

const rowToApiProduct = (row: Product): ApiProduct => {
  const parsed = apiProductSchema.safeParse({
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price.toString(),
    quantity: row.quantity,
    category: row.category,
    brand: row.brand,
    rating: row.rating,
    images: Array.isArray(row.images) ? [...row.images] : [],
    attributes:
      row.attributes && typeof row.attributes === "object"
        ? (row.attributes as Record<string, unknown>)
        : {},
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  });

  if (!parsed.success) {
    throw new Error(`Invalid product row "${row.id}": ${parsed.error.message}`);
  }

  return parsed.data;
};

export const productsRepository = {
  async listFeatured(limit: number): Promise<ApiProduct[]> {
    const rows = await prisma.product.findMany({
      orderBy: { rating: "desc" },
      take: limit
    });

    return rows.map(rowToApiProduct);
  },

  async findById(id: string): Promise<ApiProduct | null> {
    const row = await prisma.product.findUnique({
      where: { id }
    });

    if (!row) return null;
    return rowToApiProduct(row);
  },

  async listSimilar(
    category: string,
    excludeId: string,
    limit: number
  ): Promise<ApiProduct[]> {
    const rows = await prisma.product.findMany({
      where: {
        id: { not: excludeId },
        category: {
          equals: category,
          mode: "insensitive"
        }
      },
      orderBy: { rating: "desc" },
      take: limit
    });

    return rows.map(rowToApiProduct);
  },

  async search(params: {
    q?: string;
    category?: string;
    brand?: string;
    priceMin?: number;
    priceMax?: number;
    limit: number;
    offset: number;
  }): Promise<{ items: ApiProduct[]; total: number }> {
    const andConditions: Prisma.ProductWhereInput[] = [];

    const categoryCondition = buildCaseInsensitiveCondition(
      "category",
      params.category
    );
    if (categoryCondition) {
      andConditions.push(categoryCondition);
    }

    const brandCondition = buildCaseInsensitiveCondition("brand", params.brand);
    if (brandCondition) {
      andConditions.push(brandCondition);
    }

    if (params.priceMin !== undefined || params.priceMax !== undefined) {
      andConditions.push({
        price: {
          gte: params.priceMin,
          lte: params.priceMax
        }
      });
    }

    const trimmedQuery = params.q?.trim();
    if (trimmedQuery) {
      andConditions.push({
        OR: [
          { name: { contains: trimmedQuery, mode: "insensitive" } },
          { description: { contains: trimmedQuery, mode: "insensitive" } }
        ]
      });
    }

    const where: Prisma.ProductWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { rating: "desc" },
        take: params.limit,
        skip: params.offset
      }),
      prisma.product.count({ where })
    ]);

    return {
      items: items.map(rowToApiProduct),
      total
    };
  }
};
