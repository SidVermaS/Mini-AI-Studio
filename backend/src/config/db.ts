import { PrismaClient } from "../generated/prisma/client";

export const prismaPg = new PrismaClient({
    // log: ["query", "info", "warn", "error"],
})