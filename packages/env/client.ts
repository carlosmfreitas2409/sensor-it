import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
		GOOGLE_OAUTH_REDIRECT_URI: z.string().url(),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.string().url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

		GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
		GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
	},
	emptyStringAsUndefined: true,
});
