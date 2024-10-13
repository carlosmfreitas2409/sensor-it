import type { Device, InsertDevice } from '@/infra/db';

export interface IDeviceRepository {
	listByOrganizationId(organizationId: string): Promise<Device[]>;
	findById(id: string): Promise<Device | null>;
	findBySerialNumber(serialNumber: string): Promise<Device | null>;
	create(device: InsertDevice): Promise<Device>;
	delete(id: string): Promise<void>;
}
