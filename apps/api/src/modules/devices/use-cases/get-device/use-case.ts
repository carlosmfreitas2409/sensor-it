import { deviceModelsConfig } from '@/config/device-models';

import { NotFoundException } from '@/infra/http/errors';

import type { IDeviceRepository } from '../../repositories/interfaces/device-repository';

import type { IGetDeviceUseCase, GetDeviceInput, GetDeviceOutput } from './dto';

export class GetDeviceUseCase implements IGetDeviceUseCase {
	constructor(private readonly deviceRepository: IDeviceRepository) {}

	async execute({
		organizationId,
		deviceId,
	}: GetDeviceInput): Promise<GetDeviceOutput> {
		const device = await this.deviceRepository.findById(deviceId);

		if (!device || device.organizationId !== organizationId) {
			throw new NotFoundException('Device not found');
		}

		return {
			...device,
			image: deviceModelsConfig[device.model].image,
		};
	}
}
