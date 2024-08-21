import { Elysia, t } from 'elysia';

import { makeCreateAccountUseCase } from './factory';

export const createAccountController = new Elysia().post(
	'/sign-up',
	async ({ body, set }) => {
		const useCase = makeCreateAccountUseCase();

		const result = await useCase.execute(body);

		set.status = 201;
		return result;
	},
	{
		body: t.Object({
			name: t.String(),
			email: t.String({ format: 'email' }),
			password: t.String({ minLength: 6 }),
		}),
	},
);
