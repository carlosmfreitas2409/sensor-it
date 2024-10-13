import { DrizzleDeviceRepository } from '../../repositories/drizzle/device-repository';

import { GetDeviceUseCase } from './use-case';

export function makeGetDeviceUseCase() {
	const deviceRepository = new DrizzleDeviceRepository();

	const useCase = new GetDeviceUseCase(deviceRepository);

	return useCase;
}
