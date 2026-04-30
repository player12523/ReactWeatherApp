import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
 
// Uses DATABASE_URL to connect Prisma to PostgreSQL.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
 
const prisma = new PrismaClient({ adapter });
 
export default prisma;
