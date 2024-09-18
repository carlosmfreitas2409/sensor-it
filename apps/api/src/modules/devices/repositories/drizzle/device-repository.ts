import { db, type InsertDevice, type Device, devices } from '@/infra/db';

import { clickHouse } from '@/infra/lib/clickhouse';

import type { IDeviceRepository } from '../interfaces/device-repository';

export class DrizzleDeviceRepository implements IDeviceRepository {
	public drizzle = db;

	async listByOrganizationId(organizationId: string): Promise<Device[]> {
		const devices = await this.drizzle.query.devices.findMany({
			where: (fields, { eq }) => eq(fields.organizationId, organizationId),
			orderBy: (fields, { asc }) => asc(fields.createdAt),
			with: {
				assignee: true,
			},
		});

		return devices;
	}

	async findBySerialNumber(serialNumber: string): Promise<Device | null> {
		const device = await this.drizzle.query.devices.findFirst({
			where: (fields, { eq }) => eq(fields.serialNumber, serialNumber),
		});

		if (!device) {
			return null;
		}

		return device;
	}

	async create(dto: InsertDevice): Promise<Device> {
		const [device] = await this.drizzle.insert(devices).values(dto).returning();

		await clickHouse.devicesMetadata.insert({
			timestamp: new Date(),
			organizationId: dto.organizationId,
			deviceId: device.id,
			serialNumber: dto.serialNumber,
			createdAt: device.createdAt,
			deleted: 0,
		});

		return device;
	}
}
