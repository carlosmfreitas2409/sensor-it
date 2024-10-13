import type { IMqttHandler } from '@sensor-it/core';

type AddMetricInput = {
	serialNumber: string;
	type: 'temperature' | 'energy' | 'vibration';
	value: number;
};

type IAddMetricHandler = IMqttHandler<AddMetricInput>;

export type { IAddMetricHandler, AddMetricInput };
