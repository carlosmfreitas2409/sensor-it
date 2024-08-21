import { deviceModelsConfig } from '@/config/device-models';

import type { IDeviceRepository } from '../../repositories/interfaces/device-repository';

import type {
	IListDevicesUseCase,
	ListDevicesInput,
	ListDevicesOutput,
} from './dto';

export class ListDevicesUseCase implements IListDevicesUseCase {
	constructor(private readonly deviceRepository: IDeviceRepository) {}

	async execute({
		organizationId,
	}: ListDevicesInput): Promise<ListDevicesOutput> {
		const devices =
			await this.deviceRepository.listByOrganizationId(organizationId);

		const devicesWithImage = devices.map((device) => ({
			...device,
			image: deviceModelsConfig[device.model].image,
		}));

		return devicesWithImage;
	}
}
