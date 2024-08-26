import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		DATABASE_SSL: z
			.preprocess((val) => val === 'true', z.boolean())
			.default(false),
		JWT_SECRET_KEY: z.string().min(1),
		GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
		GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
		GOOGLE_OAUTH_REDIRECT_URI: z.string().url(),

		MQTT_BROKER: z.string().url(),
		MQTT_USERNAME: z.string(),
		MQTT_PASSWORD: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
