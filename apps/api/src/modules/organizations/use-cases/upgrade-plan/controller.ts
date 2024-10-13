import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeUpgradePlanUseCase } from './factory';

export const upgradePlanController = new Elysia().use(auth).post(
	'/upgrade',
	async ({ set, getCurrentUserId, body, params }) => {
		const userId = await getCurrentUserId();

		const useCase = makeUpgradePlanUseCase();

		const result = await useCase.execute({
			...body,
			userId,
			organizationSlug: params.slug,
		});

		set.status = 201;

		return result;
	},
	{
		body: t.Object({
			planKey: t.String(),
			period: t.Union([t.Literal('monthly'), t.Literal('yearly')]),
			cancelPath: t.Optional(t.String()),
		}),
		params: t.Object({
			slug: t.String(),
		}),
	},
);
