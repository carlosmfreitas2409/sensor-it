import { api } from '@/lib/http-clients/api';

type CreateOrganizationRequest = {
	name: string;
	slug: string;
	domain?: string;
	shouldAttachUsersByDomain?: boolean;
};

export async function createOrganization(body: CreateOrganizationRequest) {
	const response = await api.post('organizations', {
		json: body,
	});

	return response;
}
