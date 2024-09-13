import type { IUseCase } from '@/core/infra/use-case';

type GetGeneralMetricsInput = {
	organizationId: string;
};

type IGetGeneralMetricsUseCase = IUseCase<GetGeneralMetricsInput>;

export type { IGetGeneralMetricsUseCase, GetGeneralMetricsInput };
