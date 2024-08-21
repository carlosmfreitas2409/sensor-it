import Elysia from 'elysia';

import { listOrganizationsController } from '../use-cases/list-organizations/controller';

export const organizationsRoutes = new Elysia().use(
	listOrganizationsController,
);
