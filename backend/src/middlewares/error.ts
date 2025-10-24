import type { FastifyReply, FastifyRequest } from 'fastify';


import { ZodError } from 'zod';
import {AppError} from '@errors/index';
import { Prisma as PrismaPg } from '@generated/prisma/client';

export const errorMiddleware = (_error: unknown, _request: FastifyRequest, reply: FastifyReply) => {
  // console.log('1 _error');
  // console.log(_error);

  let appError: AppError;
  if (_error instanceof AppError) {
    appError = _error as AppError;
  } else if (
    [
      _error instanceof PrismaPg.PrismaClientValidationError,
    ].includes(true)
  ) {
    appError = new AppError('GEN006', (_error as PrismaPg.PrismaClientValidationError).stack);
  } else if (
    [
      _error instanceof PrismaPg.PrismaClientKnownRequestError,
    ].includes(true)
  ) {
    appError = new AppError('GEN006', (_error as PrismaPg.PrismaClientKnownRequestError).stack);
  } else if (_error instanceof SyntaxError) {
    appError = new AppError('GEN006', _error.stack);
  }
  // For ZodError
  else if ((_error as ZodError)?.issues?.length) {
    appError = new AppError('GEN007', _error as ZodError);
  } else if ((_error as Error)?.stack?.length) {
    appError = new AppError('GEN007', (_error as Error)?.stack);
  } else {
    appError = new AppError('GEN001');
  }

  // console.log(appError);
  reply.status(appError.status).send(appError.json);
  return;
};
