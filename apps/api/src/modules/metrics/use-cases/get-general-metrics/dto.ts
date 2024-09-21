import type { IUseCase } from '@sensor-it/core';

type GetGeneralMetricsInput = {
	organizationId: string;
};

type IGetGeneralMetricsUseCase = IUseCase<GetGeneralMetricsInput>;

export type { IGetGeneralMetricsUseCase, GetGeneralMetricsInput };
