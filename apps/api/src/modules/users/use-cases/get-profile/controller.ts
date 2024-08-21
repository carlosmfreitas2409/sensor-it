import { Elysia } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeGetProfileUseCase } from './factory';
import { successResponse } from './dto';

export const getProfileController = new Elysia().use(auth).get(
	'/profile',
	async ({ set, getCurrentUserId }) => {
		const userId = await getCurrentUserId();

		const useCase = makeGetProfileUseCase();

		const result = await useCase.execute({
			userId,
		});

		set.status = 200;
		return result;
	},
	{
		response: {
			200: successResponse,
		},
	},
);
