import { DrizzleOrganizationRepository } from '../../repositories/drizzle/organization-repository';

import { ListOrganizationsUseCase } from './use-case';

export function makeListOrganizationsUseCase() {
	const organizationRepository = new DrizzleOrganizationRepository();

	const useCase = new ListOrganizationsUseCase(organizationRepository);

	return useCase;
}
