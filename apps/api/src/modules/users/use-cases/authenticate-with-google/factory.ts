import { DrizzleAccountRepository } from '../../repositories/drizzle/account-repository';
import { DrizzleUserRepository } from '../../repositories/drizzle/user-repository';

import { AuthenticateWithGoogleUseCase } from './use-case';

export function makeAuthenticateWithGoogleUseCase() {
	const userRepository = new DrizzleUserRepository();
	const accountRepository = new DrizzleAccountRepository();

	const useCase = new AuthenticateWithGoogleUseCase(
		userRepository,
		accountRepository,
	);

	return useCase;
}
