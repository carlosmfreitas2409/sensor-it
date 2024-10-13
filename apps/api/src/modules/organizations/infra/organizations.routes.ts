import Elysia from 'elysia';

import { listOrganizationsController } from '../use-cases/list-organizations/controller';
import { createOrganizationController } from '../use-cases/create-organization/controller';
import { getOrganizationController } from '../use-cases/get-organization/controller';

export const organizationsRoutes = new Elysia()
	.use(listOrganizationsController)
	.use(getOrganizationController)
	.use(createOrganizationController);
