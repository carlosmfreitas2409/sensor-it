import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		JWT_SECRET_KEY: z.string().min(1),
		APP_DOMAIN: z.string().url(),

		ATLAS_DATABASE_URL: z.string().url(),
		HOUSTON_DATABASE_URL: z.string().url(),
		DATABASE_SSL: z
			.preprocess((val) => val === 'true', z.boolean())
			.default(false),
		QDRANT_URL: z.string().url(),
		QDRANT_API_KEY: z.string().optional(),

		GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
		GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
		GOOGLE_OAUTH_REDIRECT_URI: z
			.string()
			.transform((path) => process.env.APP_DOMAIN + path),

		TINYBIRD_API_URL: z.string().url(),
		TINYBIRD_API_KEY: z.string(),

		MQTT_BROKER: z.string().url(),
		MQTT_USERNAME: z.string(),
		MQTT_PASSWORD: z.string(),

		OPENAI_API_KEY: z.string(),

		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
