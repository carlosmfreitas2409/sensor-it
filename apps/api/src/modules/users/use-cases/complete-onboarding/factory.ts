import { DrizzleUserRepository } from '../../repositories/drizzle/user-repository';

import { CompleteOnboardingUseCase } from './use-case';

export function makeCompleteOnboardingUseCase() {
	const userRepository = new DrizzleUserRepository();

	const useCase = new CompleteOnboardingUseCase(userRepository);

	return useCase;
}
