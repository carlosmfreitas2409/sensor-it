import type { IMemberRepository } from '../../repositories/interfaces/member-repository';

import type {
	IListMembersUseCase,
	ListMembersInput,
	ListMembersOutput,
} from './dto';

export class ListMembersUseCase implements IListMembersUseCase {
	constructor(private readonly memberRepository: IMemberRepository) {}

	async execute({
		organizationId,
	}: ListMembersInput): Promise<ListMembersOutput> {
		const members =
			await this.memberRepository.listByOrganizationId(organizationId);

		return members;
	}
}
