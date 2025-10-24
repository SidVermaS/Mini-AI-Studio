import { FastifyInstance } from 'fastify';
import unsecureRoutes from './unsecureRoutes';
import secureRoutes from './secureRoutes';

const routes = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(secureRoutes);
  await fastify.register(unsecureRoutes);
};

export default routes;
