import { HttpStatus } from "@consts/common";
import { AppError } from "@errors/index";
import { GenerationModule, UserModule } from "@modules/index";
import { CursorPaginationSchema, RouteParamSchema } from "@schemas/common";
import { GenerationCreateSchema } from "@schemas/index";
import type { FastifyInstance } from "fastify";

export const userRoutes = (app: FastifyInstance) => {
    app.get('/api/v1/user/:id', { onRequest: [] }, async (request, reply) => {
        const { data: paramsData, error: paramsError } = RouteParamSchema.safeParse(request.params);
        if (paramsError) {
            throw new AppError('USER002', paramsError);
        }
        const result = await UserModule.fetchOne(paramsData);
        return reply.status(HttpStatus.OK).send(result);
    });
}