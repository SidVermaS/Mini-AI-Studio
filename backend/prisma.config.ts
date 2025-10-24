import { defineConfig, env } from "prisma/config";
import * as dotenv from 'dotenv';

// Choose env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });


export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("POSTGRES_DATABASE_URL"),
  },
});
