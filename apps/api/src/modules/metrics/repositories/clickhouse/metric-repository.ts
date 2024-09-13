import type { DeviceEvent } from '@sensor-it/clickhouse';

import { clickHouse } from '@/infra/lib/clickhouse';

import type {
	IMetricRepository,
	CountDevicesOutput,
} from '../interfaces/metric-repository';

export class ClickHouseMetricRepository implements IMetricRepository {
	async countDevices(organizationId: string): Promise<CountDevicesOutput> {
		const [countDevices] =
			await clickHouse.devicesMetadata.rawQuery<CountDevicesOutput>(
				`
				SELECT
					COUNT(*) AS total, 
					round(
						(COUNTIf(toStartOfMonth(created_at) = toStartOfMonth(now())) / 
						COUNTIf(toStartOfMonth(created_at) = toStartOfMonth(now() - INTERVAL 1 MONTH)) * 0.1), 2
					) AS percentageOverLastMonth
				FROM devices_metadata
				WHERE organization_id = {organizationId: UUID}
			`,
				{ organizationId },
			);

		return countDevices;
	}

	async create(metric: DeviceEvent): Promise<void> {
		await clickHouse.deviceEvents.insert(metric);
	}
}
