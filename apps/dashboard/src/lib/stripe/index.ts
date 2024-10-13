import { loadStripe, type Stripe } from '@stripe/stripe-js';

import { env } from '@sensor-it/env/client';

let stripePromise: Promise<Stripe | null>;

export function getStripe() {
	if (!stripePromise) {
		stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
	}

	return stripePromise;
}
