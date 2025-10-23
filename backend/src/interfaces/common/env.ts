export type NodeEnv = 'development' | 'production' | 'test'
export type Env={
    DATABASE_URL: string;
    NODE_ENV: NodeEnv;
    PORT: number;
}