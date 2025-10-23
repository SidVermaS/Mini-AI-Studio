import type{ Env, NodeEnv } from "@interfaces/index";


export const ENV: Env = {
    DATABASE_URL: String(process.env.DATABASE_URL),
    NODE_ENV: process.env.NODE_ENV as NodeEnv,
    PORT: Number(process.env.PORT) || 4000
};
