import { api } from '@/lib/http-clients/api';

import type { Overview } from '@/entities/metrics';

type GetOverviewResponse = Overview;

export async function getOverview(slug: string) {
	const response = await api
		.get(`organizations/${slug}/metrics/overview`)
		.json<GetOverviewResponse>();

	return response;
}
