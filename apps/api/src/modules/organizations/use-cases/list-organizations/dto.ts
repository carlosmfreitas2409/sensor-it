import { type Static, t } from 'elysia';

import type { IUseCase } from '@sensor-it/core';

import { roleSchema } from '@sensor-it/auth';

const successResponse = t.Array(
	t.Object({
		id: t.String(),
		name: t.String(),
		slug: t.String(),
		avatarUrl: t.Nullable(t.String({ format: 'uri' })),
		role: t.Enum(roleSchema.Enum),
		devices: t.Number(),
	}),
);

type ListOrganizationsInput = {
	userId: string;
};

type ListOrganizationsOutput = Static<typeof successResponse>;

type IListOrganizationsUseCase = IUseCase<
	ListOrganizationsInput,
	ListOrganizationsOutput
>;

export type {
	IListOrganizationsUseCase,
	ListOrganizationsInput,
	ListOrganizationsOutput,
};

export { successResponse };
