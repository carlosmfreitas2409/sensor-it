import { DrizzleMemberRepository } from '../../repositories/drizzle/member-repository';

import { ListMembersUseCase } from './use-case';

export function makeListMembersUseCase() {
	const memberRepository = new DrizzleMemberRepository();

	const useCase = new ListMembersUseCase(memberRepository);

	return useCase;
}
