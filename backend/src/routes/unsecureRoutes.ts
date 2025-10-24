import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth';

const unsecureRoutes = (fastify: FastifyInstance): void => {
  fastify.register(authRoutes);
};

export default unsecureRoutes;
