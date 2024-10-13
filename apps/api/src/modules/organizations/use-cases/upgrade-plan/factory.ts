import { DrizzleUserRepository } from '@/modules/users/repositories/drizzle/user-repository';

import { DrizzleOrganizationRepository } from '../../repositories/drizzle/organization-repository';

import { UpgradePlanUseCase } from './use-case';

export function makeUpgradePlanUseCase() {
	const organizationRepository = new DrizzleOrganizationRepository();
	const userRepository = new DrizzleUserRepository();

	const useCase = new UpgradePlanUseCase(
		organizationRepository,
		userRepository,
	);

	return useCase;
}
