import { api } from '@/lib/http-clients/api';

type DeleteDeviceRequest = {
	slug: string;
	deviceId: string;
};

export async function deleteDevice({ slug, deviceId }: DeleteDeviceRequest) {
	await api.delete(`organizations/${slug}/devices/${deviceId}`);
}
