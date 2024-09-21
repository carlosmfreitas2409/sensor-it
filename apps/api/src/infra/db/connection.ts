import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '@sensor-it/env/server';

import * as schema from './schema';

export type IDatabaseConnection = typeof db;

const client = postgres(env.ATLAS_DATABASE_URL, {
	ssl: env.DATABASE_SSL ? 'require' : false,
});

export const db = drizzle(client, { schema });
