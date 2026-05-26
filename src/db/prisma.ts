import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/index";
import { getDatabaseUrl } from "@/config/env";

type GlobalPrisma = {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as unknown as GlobalPrisma;

const sanitizeConnectionUrl = (connectionUrl: string): string => {
  const parsed = new URL(connectionUrl);
  parsed.searchParams.delete("schema");
  return parsed.toString();
};

const adapter = new PrismaPg({
  connectionString: sanitizeConnectionUrl(getDatabaseUrl())
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
