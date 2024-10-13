import { z } from 'zod';

import { tb } from './client';

export type Event = keyof typeof schemas;
export type EventSchema<E extends Event> = z.infer<(typeof schemas)[E]>;

export const buildAnalytics = (event: Event) =>
	tb.buildPipe({
		pipe: `v1_${event}`,
		parameters: z.object({
			serialNumber: z.string(),
			start: z.string().optional(),
			end: z.string().optional(),
			granularity: z.enum(['minute', 'hour', 'day', 'month']).optional(),
			timezone: z.string().optional(),
		}),
		data: schemas[event],
	});

const timeseriesSchema = z.object({
	timestamp: z.string(),
	value: z.number(),
});

const schemas = {
	last_temperature: z.object({
		cold_threshold: z.number(),
		hot_threshold: z.number(),
		last_temp: z.number(),
	}),
	vibrations: timeseriesSchema,
	current: timeseriesSchema,
	real_power: timeseriesSchema,
	apparent_power: timeseriesSchema,
};
