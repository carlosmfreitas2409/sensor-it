import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

export const getOrganizationController = new Elysia().use(auth).get(
	'/:slug',
	async ({ set, params, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		set.status = 200;

		return organization;
	},
	{
		params: t.Object({
			slug: t.String(),
		}),
	},
);
