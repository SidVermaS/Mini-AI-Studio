import { prismaPg } from "@config/db";
import { AppError } from "@errors/AppError";
import { Prisma } from "generated/prisma";

export const UserModule = {
    exists: async (filters: Prisma.UserWhereInput) => {
        const userCount = await prismaPg.user.count({
            where: filters,
        });
        return userCount > 0;
    },
    fetchOne: async (filters: Prisma.UserWhereInput) => {
        const user = await prismaPg.user.findFirst({
            where: filters,
        });
        if(!user) {
            throw new AppError('USER001');
        }
        return user;
    }
}