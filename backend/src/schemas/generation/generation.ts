import z from "zod";

export const GenerationCreateSchema = z.object({
    prompt: z.string().min(1).max(500),
});
export type GenerationCreate = z.infer<typeof GenerationCreateSchema>;