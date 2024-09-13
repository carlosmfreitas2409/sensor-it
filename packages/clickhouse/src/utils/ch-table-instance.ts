import type { ClickHouseClient } from '@clickhouse/client';

import type { ChTable } from './ch-table';
import type { InferModel } from './core';

export class CHTableInstance<TTable extends ChTable> {
	constructor(
		private readonly client: ClickHouseClient,
		private readonly table: TTable,
	) {}

	get tableName() {
		return this.table.name;
	}

	async rawQuery<T>(
		query: string,
		params?: Record<string, unknown>,
	): Promise<T[]> {
		if (!this.client) {
			throw new Error('ClickHouse connection not established');
		}

		const result = await this.client.query({
			query,
			query_params: params,
			format: 'JSONEachRow',
		});

		return result.json<T>();
	}

	async insert(values: InferModel<TTable>) {
		await this.client.insert({
			table: this.tableName,
			values: [this.mapKeysToColumns(values)],
			format: 'JSONEachRow',
		});
	}

	private mapKeysToColumns(values: Record<string, unknown>) {
		const mappedColumns = Object.entries(values).map(([key, value]) => {
			const column = this.table.columns[key];

			if (!column) {
				throw new Error(`Column ${key} not found`);
			}

			return [column.name, value];
		});

		return Object.fromEntries(mappedColumns);
	}
}
