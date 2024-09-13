import type { ChColumnBuilderBase } from './column-builder';

export type ChTable = {
	name: string;
	columns: Record<string, ChColumnBuilderBase>;
	_isChTable: true;
};

export function chTable<
	TTableName extends string,
	TColumns extends Record<string, ChColumnBuilderBase>,
>(name: TTableName, columns: TColumns) {
	return {
		name,
		columns,
		_isChTable: true as const,
	};
}
