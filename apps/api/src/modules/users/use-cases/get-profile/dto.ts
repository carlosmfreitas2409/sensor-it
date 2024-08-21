import { type Static, t } from 'elysia';

import type { IUseCase } from '@/core/infra/use-case';

const successResponse = t.Object({
	user: t.Object({
		id: t.String(),
		email: t.String({ format: 'email' }),
		name: t.String(),
		avatarUrl: t.Nullable(t.String({ format: 'uri' })),
	}),
});

type GetProfileInput = {
	userId: string;
};

type GetProfileOutput = Static<typeof successResponse>;

type IGetProfileUseCase = IUseCase<GetProfileInput, GetProfileOutput>;

export type { IGetProfileUseCase, GetProfileInput, GetProfileOutput };

export { successResponse };