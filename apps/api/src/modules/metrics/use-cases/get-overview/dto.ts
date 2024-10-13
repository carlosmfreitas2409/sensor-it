import type { IUseCase } from '@sensor-it/core';

type GetOverviewInput = {
	organizationId: string;
};

type IGetOverviewUseCase = IUseCase<GetOverviewInput>;

export type { IGetOverviewUseCase, GetOverviewInput };
