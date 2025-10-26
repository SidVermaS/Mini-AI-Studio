import { FastifyInstance } from 'fastify';
import unsecureRoutes from './unsecureRoutes';
import secureRoutes from './secureRoutes';

const routes = (fastify: FastifyInstance): void => {
  fastify.register(secureRoutes);
  fastify.register(unsecureRoutes);
};

export default routes;
