import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export type { Prisma } from "@prisma/client";
export default db;
