import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeAuthenticateWithGoogleUseCase } from './factory';

export const authenticateWithGoogleController = new Elysia().use(auth).post(
	'/google',
	async ({ body, set, jwt }) => {
		const useCase = makeAuthenticateWithGoogleUseCase();

		const result = await useCase.execute(body);

		const token = await jwt.sign({ sub: result.userId });

		set.status = 201;
		return { token };
	},
	{
		body: t.Object({
			code: t.String(),
		}),
	},
);
