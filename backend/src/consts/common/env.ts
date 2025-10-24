import type{ Env, NodeEnv } from "@interfaces/index";


export const ENV: Env = {
    JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
    JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN),
    POSTGRES_DATABASE_URL: String(process.env.POSTGRES_DATABASE_URL),
    NODE_ENV: process.env.NODE_ENV as NodeEnv,
    BACKEND_PORT: Number(process.env.BACKEND_PORT) || 4000
};
