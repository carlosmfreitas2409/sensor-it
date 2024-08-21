import type { DrizzleConfig } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@sensor-it/env/server';

import * as schema from './schema';

function createConnection(config?: DrizzleConfig) {
	const client = postgres(env.DATABASE_URL);

	return drizzle(client, { ...config, schema });
}

export { createConnection, schema };
