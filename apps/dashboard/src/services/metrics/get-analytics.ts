import { api } from '@/lib/http-clients/api';

import type { Analytics, AnalyticsEvent } from '@/entities/metrics';

type GetAnalyticsInput<T extends AnalyticsEvent> = {
	slug: string;
	searchParams: {
		event: T;
		deviceId: string;
		interval?: string;
		start?: string;
		end?: string;
	};
};

type GetAnalyticsResponse<T extends AnalyticsEvent> = Analytics<T>;

export async function getAnalytics<T extends AnalyticsEvent>({
	slug,
	searchParams,
}: GetAnalyticsInput<T>) {
	const response = await api
		.get(`organizations/${slug}/metrics`, {
			searchParams,
		})
		.json<GetAnalyticsResponse<T>>();

	return response;
}
