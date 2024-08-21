import { DrizzleUserRepository } from '../../repositories/drizzle/user-repository';

import { AuthenticateWithPasswordUseCase } from './use-case';

export function makeAuthenticateWithPasswordUseCase() {
	const userRepository = new DrizzleUserRepository();

	const useCase = new AuthenticateWithPasswordUseCase(userRepository);

	return useCase;
}
