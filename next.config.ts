import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-neon",
    "@neondatabase/serverless",
  ],
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    AUTH_SECRET: process.env.AUTH_SECRET ?? "",
  },
};

export default nextConfig;
