import type { IUseCase } from '@sensor-it/core';

type CompleteOnboardingInput = {
	userId: string;
};

type ICompleteOnboardingUseCase = IUseCase<CompleteOnboardingInput, boolean>;

export type { CompleteOnboardingInput, ICompleteOnboardingUseCase };
