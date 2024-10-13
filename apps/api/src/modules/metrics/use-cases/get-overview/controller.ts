import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeGetOverviewUseCase } from './factory';

export const getOverviewController = new Elysia().use(auth).get(
	'/overview',
	async ({ set, params, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		const useCase = makeGetOverviewUseCase();

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
