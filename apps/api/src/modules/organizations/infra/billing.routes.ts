import Elysia from 'elysia';

import { upgradePlanController } from '../use-cases/upgrade-plan/controller';

export const billingRoutes = new Elysia().use(upgradePlanController);
