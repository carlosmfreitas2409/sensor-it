import { api } from '@/lib/http-clients/api';

import type { GeneralMetrics } from '@/entities/metrics';

type GetGeneralMetricsResponse = GeneralMetrics;

export async function getGeneralMetrics(slug: string) {
	const response = await api
		.get(`organizations/${slug}/metrics`)
		.json<GetGeneralMetricsResponse>();

	return response;
}
