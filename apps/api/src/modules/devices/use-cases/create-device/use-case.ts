import { BadRequestException } from '@/infra/http/errors';

import type { IDeviceRepository } from '../../repositories/interfaces/device-repository';

import type { CreateDeviceInput, ICreateDeviceUseCase } from './dto';

export class CreateDeviceUseCase implements ICreateDeviceUseCase {
	constructor(private readonly deviceRepository: IDeviceRepository) {}

	async execute(dto: CreateDeviceInput): Promise<void> {
		const device = await this.deviceRepository.findBySerialNumber(
			dto.serialNumber,
		);

		if (device) {
			throw new BadRequestException('This serial number is already in use.');
		}

		await this.deviceRepository.create(dto);
	}
}
