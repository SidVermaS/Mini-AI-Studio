import { authTokenMiddleware } from '@middlewares/auth';
import { FastifyInstance } from 'fastify';
import { promptRoutes } from './generation';


const secureRoutes = (fastify: FastifyInstance): void => {
  // JWT token verification is applied only to secure routes
  fastify.addHook('preHandler', authTokenMiddleware);

  fastify.register(promptRoutes ,{});
};

export default secureRoutes;
