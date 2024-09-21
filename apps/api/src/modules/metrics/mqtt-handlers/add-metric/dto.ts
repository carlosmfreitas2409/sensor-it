import type { IMqttHandler } from '@sensor-it/core';

import type { DeviceEvent } from '@sensor-it/clickhouse';

type AddMetricInput = {
	serialNumber: string;
	type: DeviceEvent['type'];
	value: number;
};

type IAddMetricHandler = IMqttHandler<AddMetricInput>;

export type { IAddMetricHandler, AddMetricInput };
