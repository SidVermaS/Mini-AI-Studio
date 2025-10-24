import { prismaPg } from "@config/db";
import { Prisma } from "generated/prisma";

export const CoreUserModule = {
    exists: async (filters: Prisma.UserWhereInput) => {
        const userCount = await prismaPg.user.count({
            where: filters,
        });
        return userCount > 0;
    }
}