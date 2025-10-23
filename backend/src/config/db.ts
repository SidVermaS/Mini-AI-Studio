import { PrismaClient } from "@prisma/client";
import { log } from "console";

export const prismaPg = new PrismaClient({
    // log: ["query", "info", "warn", "error"],
})