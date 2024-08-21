import { DrizzleUserRepository } from '../../repositories/drizzle/user-repository';

import { GetProfileUseCase } from './use-case';

export function makeGetProfileUseCase() {
	const userRepository = new DrizzleUserRepository();

	const useCase = new GetProfileUseCase(userRepository);

	return useCase;
}
