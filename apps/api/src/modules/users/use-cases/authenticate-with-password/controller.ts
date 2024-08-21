import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeAuthenticateWithPasswordUseCase } from './factory';

export const authenticateWithPasswordController = new Elysia().use(auth).post(
	'/password',
	async ({ body, set, jwt }) => {
		const useCase = makeAuthenticateWithPasswordUseCase();

		const result = await useCase.execute(body);

		const token = await jwt.sign({ sub: result.userId });

		set.status = 201;
		return { token };
	},
	{
		body: t.Object({
			email: t.String({ format: 'email' }),
			password: t.String({ minLength: 6 }),
		}),
	},
);
