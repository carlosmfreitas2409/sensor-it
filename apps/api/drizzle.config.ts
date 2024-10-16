import { defineConfig } from 'drizzle-kit';

import { env } from '@sensor-it/env/server';

export default defineConfig({
	verbose: true,
	schema: './src/infra/db/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.ATLAS_DATABASE_URL,
		ssl: env.DATABASE_SSL ? 'require' : false,
	},
});
