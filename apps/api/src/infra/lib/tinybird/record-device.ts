import { z } from 'zod';

import { tb } from './client';

const devicesMetadataSchema = z.object({
	device_id: z.string(),
	serial_number: z.string(),
	organization_id: z.string(),
	created_at: z
		.date()
		.transform((v) => v.toISOString().replace('T', ' ').replace('Z', '')),
	deleted: z
		.boolean()
		.default(false)
		.transform((v) => (v ? 1 : 0)),
});

export const recordDevice = tb.buildIngestEndpoint({
	datasource: 'devices_metadata',
	event: devicesMetadataSchema,
	wait: true,
});
