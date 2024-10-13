import { api } from '@/lib/http-clients/api';

import type { Device } from '@/entities/device';

export type ListDevicesResponse = Device[];

export async function listDevices(slug: string) {
	const response = await api
		.get(`organizations/${slug}/devices`, {
			next: { tags: [`${slug}/devices`] },
		})
		.json<ListDevicesResponse>();

	return response;
}
