import { getCount } from '@/infra/lib/tinybird/get-count';

import type { GetOverviewInput, IGetOverviewUseCase } from './dto';

export class GetOverviewUseCase implements IGetOverviewUseCase {
	async execute({ organizationId }: GetOverviewInput) {
		// const totalDevices =
		// 	await this.metricRepository.countDevices(organizationId);

		const totalDevices = await getCount({
			organizationId,
		});

		return {
			devices: totalDevices.data[0],
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
