import Stripe from 'stripe';

import { env } from '@sensor-it/env/server';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2024-06-20',
	appInfo: {
		name: 'SensorIt',
		version: '0.1.0',
	},
});
