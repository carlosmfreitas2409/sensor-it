import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getOrganization } from '@/services/organizations/get-organization';

export function useOrganization() {
	const params = useParams() as { slug: string | null };
	const searchParams = useSearchParams();

	const slug =
		params.slug ||
		searchParams.get('organization') ||
		searchParams.get('slug') ||
		'';

	const { data: organization, isLoading } = useQuery({
		queryKey: ['organization', slug],
		queryFn: () => getOrganization(slug),
		staleTime: 1000 * 60,
	});

	return {
		...organization,
		isLoading,
	};
}
