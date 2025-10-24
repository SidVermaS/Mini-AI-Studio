export type NodeEnv = 'development' | 'production' | 'test'
export type Env={
    JWT_SECRET_KEY: string;
    JWT_EXPIRES_IN: string;
    POSTGRES_DATABASE_URL: string;
    NODE_ENV: NodeEnv;
    BACKEND_PORT: number;
}