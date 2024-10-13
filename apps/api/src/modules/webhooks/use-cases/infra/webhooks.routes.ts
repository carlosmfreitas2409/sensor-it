import Elysia from 'elysia';

import { stripeWebhookController } from '../stripe/controller';

export const webhooksRoutes = new Elysia().use(stripeWebhookController);
