'use server';

import { revalidateTag } from 'next/cache';

import { getOrganizationSlug } from '@/lib/auth';

export async function revalidateDevices() {
	const slug = getOrganizationSlug();

	revalidateTag(`${slug}/devices`);
}
