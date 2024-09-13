import type { ChTable } from './ch-table';

export * from './ch-table';
export * from './ch-table-instance';
export * from './column-builder';

export type InferModel<TTable extends ChTable> = {
	[K in keyof TTable['columns']]: TTable['columns'][K]['data'];
};
