import type { DeviceEvent } from '@sensor-it/clickhouse';

export interface CountDevicesOutput {
	total: number;
	percentageOverLastMonth: number;
}

export interface IMetricRepository {
	countDevices(organizationId: string): Promise<CountDevicesOutput>;
	create(metric: DeviceEvent): Promise<void>;
}
