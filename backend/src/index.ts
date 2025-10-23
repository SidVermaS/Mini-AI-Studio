import { ENV, FileConfig } from '@consts/common';
import '@utils/loadEnv';

import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import { fastifyRateLimit } from '@fastify/rate-limit';
import fastifyMultipart from '@fastify/multipart';
import fastifyHealthcheck from 'fastify-healthcheck';

const setupServer = async () => {
    const app = Fastify({ logger: ENV.NODE_ENV !== 'production', ignoreTrailingSlash: true, trustProxy: true });

    // Register your routes and middleware here
    app.register(fastifyCors, {
        origin: ["*", "http://localhost:3000",],
        methods: ['GET', 'POST', 'PATCH', 'DELETE',],
        credentials: true
    }).register(fastifyHelmet).register(fastifyRateLimit, {
        max: 100,
        timeWindow: 60000,  // 1 minute in milliseconds (60 * 1000)
        cache: 100,
        ban: 2,  // Ban IP for exceeding limit twice
    }).register(fastifyMultipart, {
        limits: { fileSize: FileConfig.MAX_FILE_SIZE, files: FileConfig.MAX_NO_OF_FILES, } // 10 MB limit
    }).register(fastifyHealthcheck, {
        healthcheckUrl: '/health',
        exposeUptime: true,
        logLevel: 'info',
        underPressureOptions: {
            maxEventLoopDelay: 100,  // ms
            maxHeapUsedBytes: 200000000,  // bytes
            maxRssBytes: 300000000,  // bytes
            exposeStatusRoute: true  // Expose /status endpoint
        }
    })

    return app;
};

const startServer = async () => {
    const app = await setupServer();

    await app.listen({ port: ENV.PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        app.log.info(`Server listening at ${address}`);
    });
    const shutdown = async (_signal: string) => {
        app.log.info(`Received ${_signal}. Shutting down...`);
        await app.close();
    }
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGQUIT', () => shutdown('SIGQUIT'));
};

startServer();
