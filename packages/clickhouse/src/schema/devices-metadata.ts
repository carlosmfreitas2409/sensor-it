import {
	chTable,
	dateTime,
	int,
	text,
	uuid,
	type InferModel,
} from '../utils/core';

export type DevicesMetadata = InferModel<typeof devicesMetadata>;

export const devicesMetadata = chTable('devices_metadata', {
	timestamp: dateTime('timestamp'),
	organizationId: uuid('organization_id'),
	deviceId: uuid('device_id'),
	serialNumber: text('serial_number'),
	createdAt: dateTime('created_at'),
	deleted: int('deleted'),
});
