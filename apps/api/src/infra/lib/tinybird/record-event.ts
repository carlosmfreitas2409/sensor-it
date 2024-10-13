import { z } from 'zod';

import { tb } from './client';

const deviceEventsSchema = z.object({
	timestamp: z.string(),
	serial_number: z.string(),
	type: z.enum(['temperature', 'energy', 'vibration']),
	value: z.number(),
});

export const recordEvent = tb.buildIngestEndpoint({
	datasource: 'device_events',
	event: deviceEventsSchema,
});
