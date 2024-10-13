import { api } from '@/lib/http-clients/api';

import type { Device } from '@/entities/device';

export type GetDeviceResponse = Device;

export async function getDevice(slug: string, deviceId: string) {
	const response = await api
		.get(`organizations/${slug}/devices/${deviceId}`, {
			next: { tags: [`${slug}/devices/${deviceId}`] },
		})
		.json<GetDeviceResponse>();

	return response;
}
