import { ClickHouseMetricRepository } from '../../repositories/clickhouse/metric-repository';

import { AddMetricHandler } from './handler';

export function makeAddMetricHandler() {
	const metricRepository = new ClickHouseMetricRepository();

	const addMetricHandler = new AddMetricHandler(metricRepository);

	return addMetricHandler;
}
