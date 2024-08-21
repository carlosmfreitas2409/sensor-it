import { DrizzleUnitOfWork } from '@/infra/providers/unit-of-work/drizzle-provider';

import { DrizzleOrganizationRepository } from '@/modules/organizations/repositories/drizzle/organization-repository';
import { DrizzleMemberRepository } from '@/modules/members/repositories/drizzle/member-repository';

import { DrizzleUserRepository } from '../../repositories/drizzle/user-repository';

import { CreateAccountUseCase } from './use-case';

export function makeCreateAccountUseCase() {
	const userRepository = new DrizzleUserRepository();
	const organizationRepository = new DrizzleOrganizationRepository();
	const memberRepository = new DrizzleMemberRepository();

	const unitOfWork = new DrizzleUnitOfWork([userRepository, memberRepository]);

	const useCase = new CreateAccountUseCase(
		userRepository,
		organizationRepository,
		memberRepository,
		unitOfWork,
	);

	return useCase;
}
