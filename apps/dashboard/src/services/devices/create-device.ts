import type { Device } from '@/entities/device';
import { api } from '@/lib/http-clients/api';

type DeviceBody = Pick<
	Device,
	'name' | 'machine' | 'serialNumber' | 'model'
> & {
	assigneeId: string;
};

type CreateDeviceRequest = {
	slug: string;
	body: DeviceBody;
};

export async function createDevice({ slug, body }: CreateDeviceRequest) {
	const response = await api.post(`organizations/${slug}/devices`, {
		json: body,
	});

	return response;
}
