import { api } from '@/lib/http-clients/api';

import type { Organization } from '@/entities/organization';

type ListOrganizationsResponse = Organization[];

export async function listOrganizations() {
	const response = await api
		.get('organizations')
		.json<ListOrganizationsResponse>();

	return response;
}
