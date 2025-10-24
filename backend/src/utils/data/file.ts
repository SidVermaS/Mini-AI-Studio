import { FileConfig } from "@consts/index";
import { AppError } from "@errors/AppError";
import { MultipartFile } from "@fastify/multipart";
import { Undefined } from "@interfaces/common";
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs';

export const validateFile = (file: Undefined<MultipartFile>): void => {
    if (!file) {
        throw new AppError("FILE003");
    }
    if (!FileConfig.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        throw new AppError("FILE001",);
    }
    if (file.file.bytesRead > FileConfig.MAX_FILE_SIZE) {
        throw new AppError("FILE002");
    }
    return;
};

export const saveFile = async ({ file, subPath }: { file: MultipartFile, subPath: 'uploads' | 'output' }): Promise<any> => {
    const buffer = await file.toBuffer();
    const fileName = `${crypto.randomUUID()}.${file.mimetype.split('/')[1]}`;
    const imagePath = join(__dirname, 'storage',subPath, fileName);
    await mkdir(join(__dirname, 'storage', subPath), { recursive: true }, (err) => {
        if (err) {
            throw new AppError("FILE004");
        }
    });
    // Save the file to the specified path
    await writeFile(imagePath, buffer);
    return imagePath;
}