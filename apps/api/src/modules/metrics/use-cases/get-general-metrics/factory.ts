import { ClickHouseMetricRepository } from '../../repositories/clickhouse/metric-repository';
import { GetGeneralMetricsUseCase } from './use-case';

export function makeGetGeneralMetrics() {
	const metricRepository = new ClickHouseMetricRepository();

	const useCase = new GetGeneralMetricsUseCase(metricRepository);

	return useCase;
}
