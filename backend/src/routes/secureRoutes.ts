import { authTokenMiddleware } from '@middlewares/auth';
import { FastifyInstance } from 'fastify';
import { generationRoutes } from './generation';
import { userRoutes } from './user';


const secureRoutes = (fastify: FastifyInstance): void => {
  // JWT token verification is applied only to secure routes
  fastify.addHook('preHandler', authTokenMiddleware);
  fastify.register(generationRoutes);
  fastify.register(userRoutes);
};

export default secureRoutes;
