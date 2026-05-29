import type { MetadataRoute } from "next";
import { prisma } from "@/db/prisma";
import { getSiteUrl } from "@/lib/site-url";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = getSiteUrl();
  const products = await prisma.product.findMany({
    select: { id: true, updatedAt: true }
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    },
    ...products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6
    }))
  ];
};

export default sitemap;
