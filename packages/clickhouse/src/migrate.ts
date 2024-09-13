import { execSync } from 'node:child_process';

import { env } from '@sensor-it/env/server';

const {
	origin: host,
	username = 'default',
	password = '',
	pathname = 'default',
} = new URL(env.CLICKHOUSE_URL);

const database = pathname.replace('/', '');

const command = `clickhouse-migrations migrate --host=${host} --user=${username} --password=${password} --db=${database} --migrations-home=./migrations`;

console.log(execSync(command).toString());

process.exit();
