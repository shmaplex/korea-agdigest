// lib/server/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Tell TypeScript that `global.prisma` may exist
declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined;
}

// Use the existing global client if available, otherwise create a new one
export const prisma =
  global._prisma ?? new PrismaClient({ adapter, log: ["error"] });

// Only assign to global in dev (avoid multiple clients on HMR reloads)
if (process.env.NODE_ENV !== "production") {
  global._prisma = prisma;
}
