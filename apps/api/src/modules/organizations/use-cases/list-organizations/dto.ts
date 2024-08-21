import { type Static, t } from 'elysia';

import { roleSchema } from '@sensor-it/auth';

import type { IUseCase } from '@/core/infra/use-case';

const successResponse = t.Array(
	t.Object({
		id: t.String(),
		name: t.String(),
		slug: t.String(),
		avatarUrl: t.Nullable(t.String({ format: 'uri' })),
		role: t.Enum(roleSchema.Enum),
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
