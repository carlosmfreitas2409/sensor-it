import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		APP_DOMAIN: z.string().url(),

		GOOGLE_OAUTH_CLIENT_ID: z.string(),
		GOOGLE_OAUTH_REDIRECT_URI: z
			.string()
			.transform((path) => process.env.APP_DOMAIN + path),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_HOUSTON_API_URL: z.string().url(),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
	},
	runtimeEnv: {
		APP_DOMAIN: process.env.APP_DOMAIN,
		GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
		GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_HOUSTON_API_URL: process.env.NEXT_PUBLIC_HOUSTON_API_URL,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
	},
	emptyStringAsUndefined: true,
	skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
