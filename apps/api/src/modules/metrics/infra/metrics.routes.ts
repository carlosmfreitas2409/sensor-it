import Elysia from 'elysia';

import { getGeneralMetricsController } from '../use-cases/get-general-metrics/controller';

export const metricsRoutes = new Elysia().use(getGeneralMetricsController);
