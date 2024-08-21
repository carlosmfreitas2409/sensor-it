import { cookies } from 'next/headers';

export function getOrganizationSlug() {
	return cookies().get('organization')?.value || null;
}

export function clearOrganization() {
	cookies().delete('organization');
}
