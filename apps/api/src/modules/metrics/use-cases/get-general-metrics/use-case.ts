import type { IMetricRepository } from '../../repositories/interfaces/metric-repository';

import type { GetGeneralMetricsInput, IGetGeneralMetricsUseCase } from './dto';

export class GetGeneralMetricsUseCase implements IGetGeneralMetricsUseCase {
	constructor(private readonly metricRepository: IMetricRepository) {}

	async execute({ organizationId }: GetGeneralMetricsInput) {
		const totalDevices =
			await this.metricRepository.countDevices(organizationId);

		return {
			devices: totalDevices,
			activeDevices: {
				total: 47,
				percentageOverLastMonth: 0.2,
			},
			failedMachines: {
				total: 2,
				percentageOverLastMonth: -0.1,
			},
		};
	}
}
