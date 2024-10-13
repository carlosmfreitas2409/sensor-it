import { Tinybird } from '@chronark/zod-bird';

import { env } from '@sensor-it/env/server';

export const tb = new Tinybird({
	baseUrl: env.TINYBIRD_API_URL,
	token: env.TINYBIRD_API_KEY,
});
