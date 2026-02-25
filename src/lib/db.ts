import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientOptions = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === "development" ? (["error"] as const) : ([] as const),
};

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient(prismaClientOptions);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaClientOptions);
  }
  db = global.prisma;
}

export { db };
