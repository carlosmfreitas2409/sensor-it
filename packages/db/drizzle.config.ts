import { defineConfig } from 'drizzle-kit';

import { env } from '@sensor-it/env/server';

export default defineConfig({
	verbose: true,
	schema: './src/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
