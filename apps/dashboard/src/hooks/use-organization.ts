import { useParams } from 'next/navigation';

export function useOrganization() {
	const { slug } = useParams() as { slug: string | null };

	return slug || null;
}
