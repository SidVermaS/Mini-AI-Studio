import { prismaPg } from "@config/db";
import { UserModule } from "@modules/user";
import { AuthLogin, AuthRegister } from "@schemas/index";
import { comparePassword, hashPassword } from "@utils/auth";
import { AppError } from "errors/index";
import type { User } from "generated/prisma";
import { JWT } from "@fastify/jwt";
export const AuthModule = {
    register: async ({ email, password, name }: AuthRegister): Promise<Pick<User, 'id'>> => {
        // Registration logic here
        const userExists = await UserModule.exists({ email });
        if (userExists) {
            throw new AppError('AUTH003');
        }
        const hashedPassword = await hashPassword(password);

        // Create user with hashed password
        const user = await prismaPg.user.create({
            select: { id: true },
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return user;
    },
    login: async (jwt: JWT, { email, password }: AuthLogin): Promise<{ user: Pick<User, 'id' | 'name' | 'email' | 'createdAt'>, token: string }> => {
        const user = await prismaPg.user.findUnique({
            where: { email },
            select: { id: true, password: true, name: true, email: true, createdAt: true },
        });
        if (!user) {
            throw new AppError('AUTH002');
        }
        const isPasswordValid = await comparePassword(user.password, password);
        if (!isPasswordValid) {
            throw new AppError('AUTH001');
        }
        const token = jwt.sign({ id: user.id });
        return { user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }, token };
    },
}