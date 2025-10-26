import { StringNull, UUID } from "../data";

export type Status = 'PROCESSING' | 'COMPLETED' | 'FAILED';

export type Generation = {
  id: UUID;
  cursorId: number;
  prompt: string;
  inputImageUrl: StringNull;
  outputImageUrl: StringNull;
  status: Status;
  createdAt: Date;
}
export type GenerationCreate = {
  prompt: string;
  file: File;
}
export type GenerationCreateResponse = Pick<Generation, 'id' | 'cursorId' |'inputImageUrl' | 'status' | 'outputImageUrl' | 'createdAt'>;

export type GenerationsResponse = {
  generations: Generation[];
}