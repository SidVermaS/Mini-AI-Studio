import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const GenerationCreateSchema = z.object({
    prompt: z
        .string()
        .min(2, "Prompt must be at least 2 characters")
        .max(500, "Prompt must be less than 500 characters")
        .trim(),
    file: z
        .instanceof(File, { message: "Please upload an image" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size must be less than 10MB",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only .jpg, .jpeg, .png and .webp formats are supported",
        }),
});

export type GenerationCreate = z.infer<typeof GenerationCreateSchema>;