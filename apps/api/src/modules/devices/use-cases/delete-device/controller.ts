import { Elysia, t } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeDeleteDeviceUseCase } from './factory';

export const deleteDeviceController = new Elysia().use(auth).delete(
	'/:deviceId',
	async ({ set, params, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		const useCase = makeDeleteDeviceUseCase();

		const result = await useCase.execute({
			organizationId: organization.id,
			deviceId: params.deviceId,
		});

		set.status = 201;
		return result;
	},
	{
		params: t.Object({
			slug: t.String(),
			deviceId: t.String(),
		}),
	},
);
