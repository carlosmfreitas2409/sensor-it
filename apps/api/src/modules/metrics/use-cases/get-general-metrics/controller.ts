import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeGetGeneralMetrics } from './factory';

export const getGeneralMetricsController = new Elysia().use(auth).get(
	'/',
	async ({ set, params, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		const useCase = makeGetGeneralMetrics();

		const result = await useCase.execute({
			organizationId: organization.id,
		});

		set.status = 200;
		return result;
	},
	{
		params: t.Object({
			slug: t.String(),
		}),
	},
);
