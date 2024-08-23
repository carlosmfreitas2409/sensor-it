import postgres from 'postgres';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { env } from '@sensor-it/env/server';

const connection = postgres(env.DATABASE_URL, {
	max: 1,
	ssl: env.DATABASE_SSL,
});

const db = drizzle(connection);

await migrate(db, { migrationsFolder: 'drizzle' });

console.log('✅ Migrations applied successfully!');

await connection.end();

process.exit();
