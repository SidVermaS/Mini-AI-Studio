import { ENV } from '@consts/common';
import { FastifyInstance } from 'fastify';

export interface JwtPayload {
    id: string;
}

export const generateToken = async (fastify: FastifyInstance, payload: JwtPayload): Promise<string> => await fastify.jwt.sign(payload, {
    expiresIn: ENV.JWT_EXPIRES_IN,
});

export const verifyToken = async (fastify: FastifyInstance, token: string): Promise<JwtPayload> => {
    try {
        return await fastify.jwt.verify<JwtPayload>(token);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};