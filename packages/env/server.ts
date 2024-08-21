import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		JWT_SECRET_KEY: z.string().min(1),
		GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
		GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
		GOOGLE_OAUTH_REDIRECT_URI: z.string().url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
