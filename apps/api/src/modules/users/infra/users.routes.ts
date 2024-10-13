import Elysia from 'elysia';

import { createAccountController } from '../use-cases/create-account/controller';
import { completeOnboardingController } from '../use-cases/complete-onboarding/controller';

export const usersRoutes = new Elysia()
	.use(createAccountController)
	.use(completeOnboardingController);
