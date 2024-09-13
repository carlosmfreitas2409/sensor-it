import type { DeviceEvent } from '@sensor-it/clickhouse';

import type { IMqttHandler } from '@/core/infra/mqtt-handler';

type AddMetricInput = {
	serialNumber: string;
	type: DeviceEvent['type'];
	value: number;
};

type IAddMetricHandler = IMqttHandler<AddMetricInput>;

export type { IAddMetricHandler, AddMetricInput };
