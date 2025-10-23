export type NodeEnv = 'development' | 'production' | 'test'
export type Env={
    POSTGRES_DATABASE_URL: string;
    NODE_ENV: NodeEnv;
    BACKEND_PORT: number;
}