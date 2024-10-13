import { z } from 'zod';

import { tb } from './client';

export const getCount = tb.buildPipe({
	pipe: 'v1_count',
	parameters: z.object({
		organizationId: z.string(),
	}),
	data: z.object({
		total: z.number().describe('Total number of devices'),
		percentageOverLastMonth: z
			.number()
			.describe('Percentage of devices over the last month')
			.default(0),
	}),
});
