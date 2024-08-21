import type { Device, InsertDevice } from '@sensor-it/db';

export interface IDeviceRepository {
	listByOrganizationId(organizationId: string): Promise<Device[]>;
	findBySerialNumber(serialNumber: string): Promise<Device | null>;
	create(device: InsertDevice): Promise<Device>;
}
