import type { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';

import { env } from '@sensor-it/env/server';

export const auth = (app: Elysia) =>
	app
		.use(
			jwt({
				secret: env.JWT_SECRET_KEY,
				exp: '7d',
			}),
		)
		.derive({ as: 'scoped' }, ({ jwt, headers }) => {
			async function getCurrentUserId() {
				const authorization = headers.authorization;

				if (!authorization || !/^Bearer\s/i.test(authorization)) {
					throw new Error('Invalid token');
				}

				const [, token] = authorization.split(' ');

				const payload = await jwt.verify(token);

				if (!payload || !payload.sub) {
					throw new Error('Invalid token');
				}

				return payload.sub;
			}

			return {
				getCurrentUserId,
			};
		});
