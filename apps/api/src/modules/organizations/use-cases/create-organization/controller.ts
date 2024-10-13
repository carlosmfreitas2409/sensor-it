import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeCreateOrganizationUseCase } from './factory';

export const createOrganizationController = new Elysia().use(auth).post(
	'/',
	async ({ set, getCurrentUserId, body }) => {
		const userId = await getCurrentUserId();

		const useCase = makeCreateOrganizationUseCase();

		const result = await useCase.execute({
			...body,
			userId,
		});

		set.status = 201;
		set.headers.Location = result;
	},
	{
		body: t.Object({
			name: t.String(),
			slug: t.Optional(t.String()),
			domain: t.Optional(t.String()),
			shouldAttachUsersByDomain: t.Optional(t.Boolean()),
		}),
	},
);
