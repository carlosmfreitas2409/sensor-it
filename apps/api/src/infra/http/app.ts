import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import { errorHandler } from './plugins/error-handler';

import { router } from './routes';

const app = new Elysia()
	.use(
		cors({
			credentials: true,
			allowedHeaders: ['content-type', 'authorization'],
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
			origin: (request): boolean => {
				const origin = request.headers.get('origin');

				if (!origin) {
					return false;
				}

				return true;
			},
		}),
	)
	.use(errorHandler)
	.use(router);

export { app };
