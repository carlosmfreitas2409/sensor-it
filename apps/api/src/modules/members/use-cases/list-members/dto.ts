import { type Static, t } from 'elysia';

import { roleSchema } from '@sensor-it/auth';

import type { IUseCase } from '@/core/infra/use-case';

const successResponse = t.Array(
	t.Object({
		id: t.String({ format: 'uuid' }),
		userId: t.String({ format: 'uuid' }),
		name: t.String(),
		email: t.String(),
		avatarUrl: t.Nullable(t.String({ format: 'uri' })),
		role: t.Enum(roleSchema.Enum),
	}),
);

type ListMembersInput = {
	organizationId: string;
};

type ListMembersOutput = Static<typeof successResponse>;

type IListMembersUseCase = IUseCase<ListMembersInput, ListMembersOutput>;

export type { IListMembersUseCase, ListMembersInput, ListMembersOutput };

export { successResponse };
