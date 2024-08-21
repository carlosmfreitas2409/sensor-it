import { Elysia } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeListOrganizationsUseCase } from './factory';

export const listOrganizationsController = new Elysia()
	.use(auth)
	.get('/', async ({ set, getCurrentUserId }) => {
		const userId = await getCurrentUserId();

		const useCase = makeListOrganizationsUseCase();

		const result = await useCase.execute({
			userId,
		});

		set.status = 200;
		return result;
	});
