import { defineConfig } from 'drizzle-kit';

import { env } from '@sensor-it/env/server';

export default defineConfig({
	verbose: true,
	schema: './src/db/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.HOUSTON_DATABASE_URL,
		ssl: env.DATABASE_SSL ? 'require' : false,
	},
});
