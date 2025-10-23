import type{ Env, NodeEnv } from "@interfaces/index";


export const ENV: Env = {
    POSTGRES_DATABASE_URL: String(process.env.POSTGRES_DATABASE_URL),
    NODE_ENV: process.env.NODE_ENV as NodeEnv,
    BACKEND_PORT: Number(process.env.BACKEND_PORT) || 4000
};
