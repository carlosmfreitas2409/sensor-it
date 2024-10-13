import type { IUseCase } from '@sensor-it/core';

type GetAnalyticsInput = {
	organizationId: string;
	event: string;
	deviceId: string;
	interval?: string;
	start?: Date;
	end?: Date;
};

type IGetAnalyticsUseCase = IUseCase<GetAnalyticsInput>;

export type { IGetAnalyticsUseCase, GetAnalyticsInput };
