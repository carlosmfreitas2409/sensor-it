import { Elysia, t } from 'elysia';

import { deviceModelEnum } from '@sensor-it/db';

import { auth } from '@/infra/http/plugins/auth';

import { makeCreateDeviceUseCase } from './factory';

export const createDeviceController = new Elysia().use(auth).post(
	'/',
	async ({ set, body, params, getUserMembership }) => {
		const { organization } = await getUserMembership(params.slug);

		const useCase = makeCreateDeviceUseCase();

		const result = await useCase.execute({
			...body,
			organizationId: organization.id,
		});

		set.status = 201;
		return result;
	},
	{
		params: t.Object({
			slug: t.String(),
		}),
		body: t.Object({
			name: t.String(),
			machine: t.String(),
			assigneeId: t.String({ format: 'uuid' }),
			model: t.Union(deviceModelEnum.enumValues.map((v) => t.Literal(v))),
			serialNumber: t.String(),
		}),
	},
);
