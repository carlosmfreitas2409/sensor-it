import { useParams, useSearchParams } from 'next/navigation';

export function useOrganizationSlug() {
	const params = useParams() as { slug: string | null };
	const searchParams = useSearchParams();

	const slug =
		params.slug || searchParams.get('organization') || searchParams.get('slug');

	return slug;
}
