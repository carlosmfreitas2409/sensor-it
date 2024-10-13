import type { MetricService } from '@sensor-it/langchain';

import { recordEvent } from '@/infra/lib/tinybird/record-event';

import type { IDeviceRepository } from '@/modules/devices/repositories/interfaces/device-repository';

import type { AddMetricInput, IAddMetricHandler } from './dto';

export class AddMetricHandler implements IAddMetricHandler {
	constructor(
		private readonly deviceRepository: IDeviceRepository,
		private readonly metricService: MetricService,
	) {}

	async handle(dto: AddMetricInput): Promise<void> {
		await Promise.all([
			this.addMetricToQdrant(dto),
			recordEvent({
				timestamp: new Date().toISOString(),
				serial_number: dto.serialNumber,
				type: dto.type,
				value: dto.value,
			}),
		]);
	}

	private async addMetricToQdrant({
		serialNumber,
		type,
		value,
	}: AddMetricInput) {
		const device = await this.deviceRepository.findBySerialNumber(serialNumber);

		if (!device || !device.organization?.slug) return;

		await this.metricService.addMetrics([
			{
				atlasOrganizationSlug: device.organization.slug,
				deviceName: device.name,
				serialNumber,
				type,
				value,
			},
		]);
	}
}
