import { FileConfig, MimeTypes } from "@consts/index";
import { AppError } from "@errors/AppError";
import { MultipartFile } from "@fastify/multipart";
import { Undefined } from "@interfaces/common";
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs';
import sharp from "sharp";

export const validateFile = (file: Undefined<MultipartFile>): void => {
    if (!file) {
        throw new AppError("FILE003");
    }
    if (!FileConfig.ALLOWED_FILE_TYPES.includes(file.mimetype as MimeTypes)) {
        throw new AppError("FILE001");
    }
    if (file.file.bytesRead > FileConfig.MAX_FILE_SIZE) {
        throw new AppError("FILE002");
    }
    return;
};

export const saveFile = async ({ file, subPath }: { file: MultipartFile, subPath: 'uploads' | 'output' }): Promise<string> => {
    const buffer: Buffer<ArrayBufferLike> = await file.toBuffer();
    const fileName = `${crypto.randomUUID()}.${file.mimetype.split('/')[1]}`;

    const storageDir = join('storage', subPath);
    const imagePath = join(storageDir, fileName);
    await mkdir(storageDir, { recursive: true }, (err) => {
        if (err) {
            throw new AppError("FILE004");
        }
    });
    // Save the file to the specified path
    await writeFile(imagePath, buffer);
    return imagePath;
}
export const editImageFile = async ({ file }: { file: MultipartFile }): Promise<Buffer> => {

    // Convert file to Buffer
    const inputBuffer = await file.toBuffer();
    const image = sharp(inputBuffer);
    // Get image metadata for sizing
    const metadata = await image.metadata();
    const { width = 800, height = 600 } = metadata;

    // Each strip covers one-third of the width
    const stripWidth = Math.floor(width / 3);

    // Create SVG overlay with 3 translucent vertical strips
    const svg = `
    <svg width="${width}" height="${height}">
      <rect x="0" y="0" width="${stripWidth}" height="${height}" fill="rgba(0, 0, 255, 0.2)" />
      <rect x="${stripWidth}" y="0" width="${stripWidth}" height="${height}" fill="rgba(255, 0, 0, 0.2)" />
      <rect x="${stripWidth * 2}" y="0" width="${stripWidth}" height="${height}" fill="rgba(0, 255, 0, 0.2)" />
    </svg>
  `;

    // Overlay the SVG on top of the image
    const outputBuffer = await image
        .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
        .png()
        .toBuffer();
    return outputBuffer;

}
export const saveBufferAsFile = async ({ buffer, mimetype = 'image/png', subPath }: { buffer: Buffer, mimetype: MimeTypes, subPath: 'uploads' | 'output' }): Promise<string> => {
    const fileName = `${crypto.randomUUID()}.${mimetype.split('/')[1]}`;

    const storageDir = join('storage', subPath);
    const imagePath = join(storageDir, fileName);
    await mkdir(storageDir, { recursive: true }, (err) => {
        if (err) {
            throw new AppError("FILE004");
        }
    });
    // Save the file to the specified path
    await writeFile(imagePath, buffer);
    return imagePath;
}