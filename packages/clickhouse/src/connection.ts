import { type ClickHouseClient, createClient } from '@clickhouse/client';

import { env } from '@sensor-it/env/server';

import { CHTableInstance } from './utils/core';

import * as tables from './schema';

type TableInstances = {
	[K in keyof typeof tables as K]: CHTableInstance<(typeof tables)[K]>;
};

type Client = ClickHouseClient & TableInstances;

let clickHouse: ClickHouseClient | null = null;

function getClient() {
	const {
		origin: host,
		username = 'default',
		password = '',
		pathname = 'default',
	} = new URL(env.CLICKHOUSE_URL);

	const database = pathname.replace('/', '');

	const client = createClient({
		url: host,
		username,
		password,
		database,
		application: 'sensor-it',
		clickhouse_settings: {
			wait_end_of_query: 1,
			date_time_output_format: 'iso',
			output_format_json_quote_64bit_integers: 0,
		},
	});

	clickHouse = client;

	return client;
}

function createConnection(): Client {
	const client = clickHouse || getClient();

	const instances = Object.entries(tables)
		.filter(([, table]) => table?._isChTable)
		.map(([key, table]) => ({ [key]: new CHTableInstance(client, table) }));

	for (const instance of instances) {
		Object.assign(client, instance);
	}

	return client as Client;
}

export function connect() {
	const {
		origin: host,
		username = 'default',
		password = '',
		pathname = 'default',
	} = new URL(env.CLICKHOUSE_URL);

	const database = pathname.replace('/', '');

	return createClient({
		url: host,
		username,
		password,
		database,
		application: 'sensor-it',
	});
}

export { createConnection };
