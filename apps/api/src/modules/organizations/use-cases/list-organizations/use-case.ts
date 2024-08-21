import type { IOrganizationRepository } from '../../repositories/interfaces/organization-repository';

import type {
	IListOrganizationsUseCase,
	ListOrganizationsInput,
	ListOrganizationsOutput,
} from './dto';

export class ListOrganizationsUseCase implements IListOrganizationsUseCase {
	constructor(
		private readonly organizationRepository: IOrganizationRepository,
	) {}

	async execute({
		userId,
	}: ListOrganizationsInput): Promise<ListOrganizationsOutput> {
		const organizationsWithUserRole =
			await this.organizationRepository.listWithUserRole(userId);

		return organizationsWithUserRole;
	}
}
