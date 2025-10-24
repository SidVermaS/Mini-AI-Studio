import { HttpStatus } from "@consts/common";
import { AppError } from "@errors/index";
import { GenerationModule } from "@modules/index";
import { CursorPaginationSchema } from "@schemas/common";
import { GenerationCreateSchema } from "@schemas/index";
import type { FastifyInstance } from "fastify";

export const generationRoutes = (app: FastifyInstance) => {
    app.get('/api/v1/generation', { onRequest: [] }, async (request, reply) => {
        const { data: queryData, error: queryError } = CursorPaginationSchema.safeParse(request.query);
        if (queryError) {
            throw new AppError('GRT001', queryError);
        }
        const result = await GenerationModule.fetch(request, queryData);
        return reply.status(HttpStatus.OK).send(result);
    });
    app.post('/api/v1/generation', { onRequest: [] }, async (request, reply) => {
        const { data: bodyData, error: bodyError } = GenerationCreateSchema.safeParse(request.body);
        if (bodyError) {
            throw new AppError('GRT003', bodyError);
        }
        const result = await GenerationModule.create( request,bodyData);
        return reply.status(HttpStatus.OK).send(result);
    });
}