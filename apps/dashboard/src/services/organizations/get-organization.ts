import { api } from '@/lib/http-clients/api';

import type { Organization } from '@/entities/organization';

type GetOrganizationResponse = Organization;

export async function getOrganization(slug: string) {
	const response = await api
		.get(`organizations/${slug}`)
		.json<GetOrganizationResponse>();

	return response;
}
