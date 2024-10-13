import { DrizzleMemberRepository } from '@/modules/members/repositories/drizzle/member-repository';
import { DrizzleOrganizationRepository } from '../../repositories/drizzle/organization-repository';

import { CreateOrganizationUseCase } from './use-case';
import { DrizzleUnitOfWork } from '@/infra/providers/unit-of-work/drizzle-provider';

export function makeCreateOrganizationUseCase() {
	const organizationRepository = new DrizzleOrganizationRepository();
	const memberRepository = new DrizzleMemberRepository();

	const unitOfWork = new DrizzleUnitOfWork([
		organizationRepository,
		memberRepository,
	]);

	const useCase = new CreateOrganizationUseCase(
		organizationRepository,
		memberRepository,
		unitOfWork,
	);

	return useCase;
}
