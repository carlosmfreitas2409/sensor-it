import { BadRequestException } from '@/infra/http/errors';

import type { IDeviceRepository } from '../../repositories/interfaces/device-repository';

import type { CreateDeviceInput, ICreateDeviceUseCase } from './dto';
import { recordDevice } from '@/infra/lib/tinybird/record-device';

export class CreateDeviceUseCase implements ICreateDeviceUseCase {
	constructor(private readonly deviceRepository: IDeviceRepository) {}

	async execute(dto: CreateDeviceInput): Promise<void> {
		const deviceExists = await this.deviceRepository.findBySerialNumber(
			dto.serialNumber,
		);

		if (deviceExists) {
			throw new BadRequestException('This serial number is already in use.');
		}

		const device = await this.deviceRepository.create(dto);

		await recordDevice({
			device_id: device.id,
			serial_number: device.serialNumber,
			organization_id: device.organizationId,
			created_at: device.createdAt,
		});
	}
}
