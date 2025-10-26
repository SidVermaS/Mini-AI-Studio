import { StringNull } from "@/types";

export type  Generation = {
    cursorId: number;
    id: string;
    prompt: string;
    inputImageUrl: StringNull;
    outputImageUrl: StringNull;
    status: $Enums.Status;
    createdAt: Date;
    updatedAt: Date;
}