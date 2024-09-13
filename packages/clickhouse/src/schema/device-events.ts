import {
	chEnum,
	chTable,
	dateTime,
	int,
	text,
	type InferModel,
} from '../utils/core';

export type DeviceEvent = InferModel<typeof deviceEvents>;

export const deviceEvents = chTable('device_events', {
	timestamp: dateTime('timestamp'),
	serialNumber: text('serial_number'),
	type: chEnum('type', ['temperature', 'vibration', 'energy']),
	value: int('value'),
});
