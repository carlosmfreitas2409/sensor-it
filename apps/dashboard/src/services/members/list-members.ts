import { api } from '@/lib/http-clients/api';

import type { UserMember } from '@/entities/member';

type ListMembersResponse = UserMember[];

export async function listMembers(slug: string) {
	const response = await api
		.get(`organizations/${slug}/members`)
		.json<ListMembersResponse>();

	return response;
}
