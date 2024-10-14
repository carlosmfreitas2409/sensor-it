import { useQuery } from '@tanstack/react-query';

import { getAnalytics } from '@/services/metrics/get-analytics';

import type { Analytics, AnalyticsEvent } from '@/entities/metrics';

import { useOrganizationSlug } from '@/hooks/use-organization-slug';
import { useAnalytics } from './components/analytics-provider';

export function useAnalyticsFilterOption<E extends AnalyticsEvent>(event: E) {
	const slug = useOrganizationSlug();

	const { deviceId, filters } = useAnalytics();

	if (!slug || !deviceId) {
		return {
			data: null,
			isLoading: false,
		};
	}

	const { data, isLoading } = useQuery({
		queryKey: ['analytics-filter-option', event, filters],
		queryFn: () =>
			getAnalytics({
				slug,
				searchParams: {
					event,
					...filters,
				},
			}),
		refetchInterval: 15000,
	});

	return {
		data: (data ?? null) as Analytics<E> | null,
		isLoading,
	};
}
