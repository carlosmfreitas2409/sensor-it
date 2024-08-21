import Elysia from 'elysia';

import { authenticateWithPasswordController } from '../use-cases/authenticate-with-password/controller';
import { authenticateWithGoogleController } from '../use-cases/authenticate-with-google/controller';
import { getProfileController } from '../use-cases/get-profile/controller';

export const sessionsRoutes = new Elysia()
	.use(authenticateWithPasswordController)
	.use(authenticateWithGoogleController)
	.use(getProfileController);
