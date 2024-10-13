import Elysia from 'elysia';

import { sessionsRoutes } from '@/modules/users/infra/sessions.routes';
import { usersRoutes } from '@/modules/users/infra/users.routes';

import { organizationsRoutes } from '@/modules/organizations/infra/organizations.routes';
import { billingRoutes } from '@/modules/organizations/infra/billing.routes';

import { membersRoutes } from '@/modules/members/infra/members.routes';

import { devicesRoutes } from '@/modules/devices/infra/devices.routes';

import { metricsRoutes } from '@/modules/metrics/infra/metrics.routes';

import { webhooksRoutes } from '@/modules/webhooks/use-cases/infra/webhooks.routes';

const router = new Elysia();

router.group('/users', (app) => app.use(usersRoutes));
router.group('/sessions', (app) => app.use(sessionsRoutes));

router.group('/organizations', (app) => {
	app.use(organizationsRoutes);

	app.group('/:slug/billing', (app) => app.use(billingRoutes));

	app.group('/:slug/members', (app) => app.use(membersRoutes));
	app.group('/:slug/devices', (app) => app.use(devicesRoutes));
	app.group('/:slug/metrics', (app) => app.use(metricsRoutes));

	return app;
});

router.group('/webhooks', (app) => app.use(webhooksRoutes));

export { router };
