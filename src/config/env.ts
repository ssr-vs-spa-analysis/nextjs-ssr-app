import { envSchema } from "@/schemas/env.schema";

let cachedUrl: string | null = null;

export const getDatabaseUrl = (): string => {
  if (cachedUrl) {
    return cachedUrl;
  }

  const { DATABASE_URL } = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL
  });

  cachedUrl = DATABASE_URL;
  return DATABASE_URL;
};
