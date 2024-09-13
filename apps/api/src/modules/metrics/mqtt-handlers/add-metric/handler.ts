import type { IMetricRepository } from '../../repositories/interfaces/metric-repository';

import type { AddMetricInput, IAddMetricHandler } from './dto';

export class AddMetricHandler implements IAddMetricHandler {
	constructor(private readonly metricRepository: IMetricRepository) {}

	async handle({ serialNumber, type, value }: AddMetricInput): Promise<void> {
		await this.metricRepository.create({
			timestamp: new Date(),
			serialNumber,
			type,
			value,
		});
	}
}
