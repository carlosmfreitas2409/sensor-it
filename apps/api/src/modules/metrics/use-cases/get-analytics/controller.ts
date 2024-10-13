import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeGetAnalyticsUseCase } from './factory';

export const getAnalyticsController = new Elysia().use(auth).get(
	'/',
	async ({ set, params, query, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		const useCase = makeGetAnalyticsUseCase();

		const result = await useCase.execute({
			organizationId: organization.id,
			...query,
		});

		set.status = 200;
		return result;
	},
	{
		params: t.Object({
			slug: t.String(),
		}),
		query: t.Object({
			event: t.String(),
			deviceId: t.String(),
			interval: t.Optional(t.String()),
			start: t.Optional(t.Date()),
			end: t.Optional(t.Date()),
		}),
	},
);
