import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL!;
  const adapter = new PrismaNeonHttp(connectionString, {
    fullResults: false,
    arrayMode: false,
  });
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
