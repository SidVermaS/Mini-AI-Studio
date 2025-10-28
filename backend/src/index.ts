import { ENV, FileConfig } from '@consts/common';
import '@utils/loadEnv';

import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import { fastifyRateLimit } from '@fastify/rate-limit';
import fastifyMultipart from '@fastify/multipart';
import fastifyHealthcheck from 'fastify-healthcheck';
import fastifyJwt from '@fastify/jwt';
import routes from '@routes/index';
import { authTokenMiddleware,errorMiddleware } from '@middlewares/index';
import { fastifyStatic } from '@fastify/static';
import { join } from 'path';

const buildServer = async () => {
    const app = Fastify({ logger: ENV.NODE_ENV !== 'production', ignoreTrailingSlash: true, trustProxy: true });

    // Register your routes and middleware here
    await app
    .register(fastifyMultipart, {
        limits: { fileSize: FileConfig.MAX_FILE_SIZE, files: FileConfig.MAX_NO_OF_FILES, } // 10 MB limit
    }).register(fastifyStatic, {
            root: join(process.cwd(), 'storage'),
            prefix: '/storage/', // URL prefix to access files
        }).register(fastifyCors, {
        origin: ["*",],
        methods: ['GET', 'POST', 'PATCH', 'DELETE',],
        credentials: true,
    }).register(fastifyHelmet,{crossOriginResourcePolicy:{ policy: "cross-origin"}})
    .register(fastifyRateLimit, {
        max: 50,  // Max 50 requests
        timeWindow: 60000,  // 1 minute in milliseconds (60 * 1000)
        cache: 100,
        ban: 2,  // Ban IP for exceeding limit twice
    })
    .register(fastifyJwt, {
        secret: ENV.JWT_SECRET_KEY,
        sign: { expiresIn: ENV.JWT_EXPIRES_IN }
    })
    .register(fastifyHealthcheck, {
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
    .register(routes)
    .setErrorHandler(errorMiddleware)
    .decorate('authenticate', authTokenMiddleware);

    return app;
};

const startServer = async () => {
    const app = await buildServer();

    await app.listen({ port: ENV.BACKEND_PORT, host: '0.0.0.0' }, (err, address) => {
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
