import { prismaPg } from "@config/db";
import { AppError } from "@errors/AppError";
import { Multipart, MultipartFile } from "@fastify/multipart";
import { Generation, Prisma, User } from "@generated/prisma";
import { CursorData } from "@interfaces/index";
import { CursorPagination, GenerationCreate, } from "@schemas/index";
import { pick, saveFile, validateFile } from "@utils/index";
import { pause } from "@utils/process";
import { FastifyRequest } from "fastify";
import { stat } from "fs";

export const GenerationModule = {
    fetch: async (request: FastifyRequest, { cursorId, pageSize }: CursorPagination): Promise<CursorData<Generation>> => {
        const user = request.user as User;
        const filters: Prisma.GenerationWhereInput = {
            userId: user.id,
        };
        if (cursorId) {
            console.log(cursorId);

            filters.cursorId = {
                lt: cursorId
            }
        }
        const generations = await prismaPg.generation.findMany({
            where: filters,
            take: pageSize + 1,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const hasNextPage = generations.length > pageSize;
        const result = hasNextPage ? generations.slice(0, pageSize) : generations;
        return {
            data: result, nextCursorId:
                result?.[result.length - 1]?.cursorId || null
        }
    },
    create: async (request: FastifyRequest, { prompt }: GenerationCreate): Promise<Pick<Generation, 'id' | 'inputImageUrl' | 'status' | 'outputImageUrl'>> => {
        const file = await request.file();
        validateFile(file);
        const user = request.user as User;
        let generationResult = await prismaPg.generation.create({
            select: { id: true, },
            data: {
                userId: user.id,
                prompt: prompt,
                status: 'PROCESSING',
            }
        });
        let input: Prisma.GenerationUpdateInput = {}
        try {
            const inputFilePath = await saveFile({ file: file!, subPath: 'uploads' });
            input.inputImageUrl = inputFilePath;
        } catch (_error) {
            input.status = 'FAILED';
        }
        generationResult = await prismaPg.generation.update({
            where: { id: generationResult.id },
            data: input,
            select: { id: true, },
        });
        if (input.status === 'FAILED') {
            return {
                id: generationResult.id,
                inputImageUrl: null,
                status: 'FAILED',
                outputImageUrl: null,
            }
        }
        // Reset input
        input = {}
        try {
            const outputImagePath = await GenerationModule.simulateImageGeneration(file!);
            input.outputImageUrl = outputImagePath;
            input.status = 'COMPLETED';
        } catch (_error) {
            input.status = 'FAILED';
        }
        generationResult = await prismaPg.generation.update({
            where: { id: generationResult.id },
            data: input,
            select: { id: true, },
        });
       if (input.status === 'FAILED') {    
            return {
                id: generationResult.id,
                inputImageUrl: generationResult.inputImageUrl,
                status: 'FAILED',
                outputImageUrl: null,
            }
       }
        return {
            id: generationResult.id,
            inputImageUrl: generationResult.inputImageUrl,
            status: 'COMPLETED',
            outputImageUrl: generationResult.outputImageUrl,
        }
    },
    simulateImageGeneration: async (file: MultipartFile): Promise<string> => {
        await pause(3000); // Simulate processing time
        // Randomly throw an error to simulate failure (10% probability)
        if(Math.random() < 0.1) {
            throw new AppError('GRT004');
        }
        const outputImagePath = await saveFile({ file: file!, subPath: 'output' });
        return outputImagePath;
    }
}