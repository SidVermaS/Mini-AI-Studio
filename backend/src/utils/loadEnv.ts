import * as dotenv from 'dotenv';

// Choose env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });