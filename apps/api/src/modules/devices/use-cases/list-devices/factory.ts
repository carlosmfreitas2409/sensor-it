import { DrizzleDeviceRepository } from '../../repositories/drizzle/device-repository';

import { ListDevicesUseCase } from './use-case';

export function makeListDevicesUseCase() {
	const deviceRepository = new DrizzleDeviceRepository();

	const useCase = new ListDevicesUseCase(deviceRepository);

	return useCase;
}
