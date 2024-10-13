import Elysia from 'elysia';

import { getOverviewController } from '../use-cases/get-overview/controller';
import { getAnalyticsController } from '../use-cases/get-analytics/controller';

export const metricsRoutes = new Elysia()
	.use(getOverviewController)
	.use(getAnalyticsController);
