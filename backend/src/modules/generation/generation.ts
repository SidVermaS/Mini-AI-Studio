import { prismaPg } from "@config/db";
import { AppError } from "@errors/AppError";
import { MultipartFile } from "@fastify/multipart";
import { Generation, Prisma, User } from "@generated/prisma";
import { CursorData } from "@interfaces/index";
import { CursorPagination, GenerationCreate, } from "@schemas/index";
import { editImageFile, pick, saveBufferAsFile, saveFile, validateFile } from "@utils/index";
import { pause } from "@utils/process";
import { FastifyRequest } from "fastify";

export const GenerationModule = {
    fetch: async (request: FastifyRequest, { cursorId, pageSize }: CursorPagination): Promise<CursorData<Pick<Generation, 'id' | 'inputImageUrl' | 'outputImageUrl' | 'status' | 'prompt' | 'cursorId' | 'createdAt'>>> => {
        const user = request.user as User;
        const filters: Prisma.GenerationWhereInput = {
            userId: user.id,
        };
        if (cursorId) {
            filters.cursorId = {
                lt: cursorId
            }
        }
        const generations = await prismaPg.generation.findMany({
            select: { id: true, inputImageUrl: true, outputImageUrl: true, status: true, prompt: true, cursorId: true, createdAt: true },
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
    create: async (request: FastifyRequest, { prompt }: GenerationCreate, file: MultipartFile): Promise<Pick<Generation, 'id' | 'cursorId' | 'inputImageUrl' | 'status' | 'outputImageUrl' | 'createdAt'>> => {
        const user = request.user as User;
        const generationResult = await prismaPg.generation.create({
            select: { id: true, cursorId: true, createdAt: true },
            data: {
                userId: user.id,
                prompt: prompt,
                status: 'PROCESSING',
            }
        });
        const inputForInputImageUrl: Prisma.GenerationUpdateInput = {}
        try {
            const inputFilePath = await saveFile({ file: file!, subPath: 'uploads' });
            inputForInputImageUrl.inputImageUrl = `/${inputFilePath}`;
        } catch (_error) {
            inputForInputImageUrl.status = 'FAILED';
        }
        let _updatedGenerationResult = await prismaPg.generation.update({
            where: { id: generationResult.id },
            data: inputForInputImageUrl,
            select: { id: true, },
        });
        if (inputForInputImageUrl.status === 'FAILED') {
            return {
                id: generationResult.id,
                inputImageUrl: null,
                status: 'FAILED',
                outputImageUrl: null,
                cursorId: generationResult.cursorId,
                createdAt: generationResult.createdAt,
            }
        }
        const inputForOutputImageUrl: Prisma.GenerationUpdateInput = {}
        try {
            const outputImagePath = await GenerationModule.simulateImageGeneration(file!);
            inputForOutputImageUrl.outputImageUrl = `/${outputImagePath}`;
            inputForOutputImageUrl.status = 'COMPLETED';
        } catch (_error) {
            inputForOutputImageUrl.status = 'FAILED';
        }
        _updatedGenerationResult = await prismaPg.generation.update({
            where: { id: generationResult.id },
            data: inputForOutputImageUrl,
            select: { id: true, },
        });
        if (inputForOutputImageUrl.status === 'FAILED') {
            return {
                id: generationResult.id,
                inputImageUrl: String(inputForInputImageUrl.inputImageUrl),
                status: 'FAILED',
                outputImageUrl: null,
                cursorId: generationResult.cursorId,
                createdAt: generationResult.createdAt,
            }
        }
        return {
            id: generationResult.id,
            inputImageUrl: String(inputForInputImageUrl.inputImageUrl),
            status: 'COMPLETED',
            outputImageUrl: String(inputForOutputImageUrl.outputImageUrl),
            cursorId: generationResult.cursorId,
            createdAt: generationResult.createdAt,
        }
    },
    simulateImageGeneration: async (file: MultipartFile): Promise<string> => {
        const DELAY_MS = 3000;
        // Randomly throw an error to simulate failure (10% probability)
        if (Math.random() < 0.1) {
            await pause(DELAY_MS); // Simulate processing time
            throw new AppError('GRT004');
        }
        const startTime = Date.now();
        const editedImageBuffer = await editImageFile({ file, });
        const outputImagePath = await saveBufferAsFile({ buffer: editedImageBuffer, mimetype: 'image/png', subPath: 'output' });
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        if (timeTaken < DELAY_MS) {
            await pause(DELAY_MS - timeTaken);
        }
        return outputImagePath;
    }
}