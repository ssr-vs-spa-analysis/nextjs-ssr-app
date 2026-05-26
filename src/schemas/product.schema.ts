import { z } from "zod";

export const apiProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  quantity: z.number(),
  category: z.string(),
  brand: z.string(),
  rating: z.number(),
  images: z.array(z.string()),
  attributes: z.record(z.string(), z.unknown()),
  createdAt: z.string(),
  updatedAt: z.string()
});
