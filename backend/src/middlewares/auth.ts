import { AppError } from "@errors/AppError";
import type { FastifyReply, FastifyRequest } from "fastify";


export const authTokenMiddleware = async (request: FastifyRequest, _reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (_error) {
    throw new AppError('AUTH005');
  }
};
