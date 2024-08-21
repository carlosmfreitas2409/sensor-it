import { DrizzleDeviceRepository } from '../../repositories/drizzle/device-repository';

import { CreateDeviceUseCase } from './use-case';

export function makeCreateDeviceUseCase() {
	const deviceRepository = new DrizzleDeviceRepository();

	const useCase = new CreateDeviceUseCase(deviceRepository);

	return useCase;
}
