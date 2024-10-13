import { MetricService } from '@sensor-it/langchain';

import { DrizzleDeviceRepository } from '@/modules/devices/repositories/drizzle/device-repository';

import { AddMetricHandler } from './handler';

export function makeAddMetricHandler() {
	const deviceRepository = new DrizzleDeviceRepository();
	const metricService = new MetricService();

	const addMetricHandler = new AddMetricHandler(
		deviceRepository,
		metricService,
	);

	return addMetricHandler;
}
