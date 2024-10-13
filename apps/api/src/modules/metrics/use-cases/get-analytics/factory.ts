import { DrizzleDeviceRepository } from '@/modules/devices/repositories/drizzle/device-repository';

import { GetAnalyticsUseCase } from './use-case';

export function makeGetAnalyticsUseCase() {
	const deviceRepository = new DrizzleDeviceRepository();

	const useCase = new GetAnalyticsUseCase(deviceRepository);

	return useCase;
}
