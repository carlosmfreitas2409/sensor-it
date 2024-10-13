import type { MetricService } from '@sensor-it/langchain';

import { NotFoundException } from '@/infra/http/errors';

import { recordDevice } from '@/infra/lib/tinybird/record-device';

import type { IDeviceRepository } from '../../repositories/interfaces/device-repository';

import type { DeleteDeviceInput, IDeleteDeviceUseCase } from './dto';

export class DeleteDeviceUseCase implements IDeleteDeviceUseCase {
	constructor(
		private readonly deviceRepository: IDeviceRepository,
		private readonly metricService: MetricService,
	) {}

	async execute({
		deviceId,
		organizationId,
	}: DeleteDeviceInput): Promise<void> {
		const device = await this.deviceRepository.findById(deviceId);

		if (!device || device.organizationId !== organizationId) {
			throw new NotFoundException('Device not found.');
		}

		await this.deviceRepository.delete(device.id);

		await Promise.all([
			recordDevice({
				device_id: device.id,
				serial_number: device.serialNumber,
				organization_id: device.organizationId,
				created_at: device.createdAt,
				deleted: true,
			}),
			this.metricService.removeMetric(device.serialNumber),
		]);
	}
}
