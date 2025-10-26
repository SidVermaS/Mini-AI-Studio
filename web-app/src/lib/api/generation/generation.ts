import { apiCall } from "@/config";
import type{ CursorData, CursorPagination, Generation, GenerationCreate, GenerationCreateResponse } from "@/types";

export const fetchGeneration = async (query:CursorPagination)=>await apiCall<CursorPagination, CursorData<Generation>>(
    '/api/v1/generation',
    'GET',
    {
        query: query,
    },
);
export const createGeneration = async (params: GenerationCreate) => await apiCall<GenerationCreate, GenerationCreateResponse>(
    '/api/v1/generation',
    'POST',
    {
        isFormData: true,
        payload: params,
    },
);