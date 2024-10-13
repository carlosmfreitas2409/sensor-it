import { MetricService } from '@sensor-it/langchain';

import { DrizzleDeviceRepository } from '../../repositories/drizzle/device-repository';

import { DeleteDeviceUseCase } from './use-case';

export function makeDeleteDeviceUseCase() {
	const deviceRepository = new DrizzleDeviceRepository();
	const metricService = new MetricService();

	const useCase = new DeleteDeviceUseCase(deviceRepository, metricService);

	return useCase;
}
