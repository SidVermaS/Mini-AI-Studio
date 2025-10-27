import { HttpStatus } from "@consts/common";
import { AppError } from "@errors/index";
import { GenerationModule } from "@modules/index";
import { CursorPaginationSchema } from "@schemas/common";
import { GenerationCreateSchema } from "@schemas/index";
import { validateFile } from "@utils/index";
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
        const data = await request.file();
        const { data: bodyData, error: bodyError } = GenerationCreateSchema.safeParse({ prompt: 'hello' });

        if (bodyError) {
            throw new AppError('GRT003', bodyError);
        }
        validateFile(data);
        const result = await GenerationModule.create(request, bodyData, data!);
        return reply.status(HttpStatus.OK).send(result);
    });
}