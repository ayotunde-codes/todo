import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    throw new Error(
      `[Prisma] No database connection string found. ` +
      `Checked: DATABASE_URL, POSTGRES_URL, POSTGRES_PRISMA_URL. ` +
      `NODE_ENV=${process.env.NODE_ENV}`
    );
  }

  const adapter = new PrismaNeonHttp(connectionString, {
    fullResults: false,
    arrayMode: false,
  });
  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
