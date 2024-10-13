import { db, type InsertDevice, type Device, devices } from '@/infra/db';

import type { IDeviceRepository } from '../interfaces/device-repository';
import { eq } from 'drizzle-orm';

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

	async findById(id: string): Promise<Device | null> {
		const device = await this.drizzle.query.devices.findFirst({
			where: (fields, { eq }) => eq(fields.id, id),
		});

		if (!device) {
			return null;
		}

		return device;
	}

	async findBySerialNumber(serialNumber: string): Promise<Device | null> {
		const device = await this.drizzle.query.devices.findFirst({
			where: (fields, { eq }) => eq(fields.serialNumber, serialNumber),
			with: {
				organization: {
					columns: {
						slug: true,
					},
				},
			},
		});

		if (!device) {
			return null;
		}

		return device;
	}

	async create(dto: InsertDevice): Promise<Device> {
		const [device] = await this.drizzle.insert(devices).values(dto).returning();

		return device;
	}

	async delete(id: string): Promise<void> {
		await this.drizzle.delete(devices).where(eq(devices.id, id));
	}
}
