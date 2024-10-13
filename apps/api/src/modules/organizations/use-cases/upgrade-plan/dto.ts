import type { IUseCase } from '@sensor-it/core';

type UpgradePlanInput = {
	organizationSlug: string;
	userId: string;
	planKey: string;
	period: 'monthly' | 'yearly';
	cancelPath?: string;
};

type UpgradePlanOutput = {
	sessionId?: string;
	url?: string;
};

type IUpgradePlanUseCase = IUseCase<UpgradePlanInput, UpgradePlanOutput>;

export type { IUpgradePlanUseCase, UpgradePlanInput, UpgradePlanOutput };
