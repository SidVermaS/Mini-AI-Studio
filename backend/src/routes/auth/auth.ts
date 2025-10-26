import { HttpStatus } from "@consts/common";
import { AppError } from "@errors/index";
import { AuthModule } from "@modules/auth";
import { AuthLoginSchema, AuthRegisterSchema } from "@schemas/auth";
import type { FastifyInstance } from "fastify";

export const authRoutes = (app: FastifyInstance) => {
    app.post('/api/v1/auth/register', async (request, reply) => {
        const { data: bodyData, error: bodyError } = AuthRegisterSchema.safeParse(request.body);
        if (bodyError) {
            throw new AppError('AUTH006', bodyError);
        }
        const result = await AuthModule.register(bodyData);
        return reply.status(HttpStatus.CREATED).send(result);
    });
    app.post('/api/v1/auth/login', async (request, reply) => {
        const { data: bodyData, error: bodyError } = AuthLoginSchema.safeParse(request.body);
        if (bodyError) {
            throw new AppError('AUTH006', bodyError);
        }
        const result = await AuthModule.login(app.jwt, bodyData);
        return reply.status(HttpStatus.OK).send(result);
    });
}