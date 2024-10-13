import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeGetDeviceUseCase } from './factory';

export const getDeviceController = new Elysia().use(auth).get(
	'/:deviceId',
	async ({ set, params, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		const useCase = makeGetDeviceUseCase();

		const result = await useCase.execute({
			organizationId: organization.id,
			deviceId: params.deviceId,
		});

		set.status = 200;
		return result;
	},
	{
		params: t.Object({
			slug: t.String(),
			deviceId: t.String(),
		}),
	},
);
