import { env } from '@sensor-it/env/server';

import { stripe } from '@/infra/lib/stripe';

import { BadRequestException } from '@/infra/http/errors';

import { makeCheckoutSessionCompletedHandler } from './handlers/checkout-session-completed/factory';
import { makeCustomerSubscriptionUpdatedHandler } from './handlers/customer-subscription-updated/factory';
import { makeCustomerSubscriptionDeletedHandler } from './handlers/customer-subscription-deleted/factory';

import type {
	IStripeWebhookUseCase,
	StripeWebhookInput,
	StripeWebhookOutput,
} from './dto';

export class StripeWebhookUseCase implements IStripeWebhookUseCase {
	async execute(dto: StripeWebhookInput): Promise<StripeWebhookOutput> {
		const event = await this.validateSignature(dto);

		if (!this.relevantEventTypes.has(event.type)) {
			return { ok: true, message: 'Unsupported event. Skipping...' };
		}

		try {
			switch (event.type) {
				case 'checkout.session.completed': {
					const handler = makeCheckoutSessionCompletedHandler();
					await handler.execute(event);
					break;
				}
				case 'customer.subscription.updated': {
					const handler = makeCustomerSubscriptionUpdatedHandler();
					await handler.execute(event);
					break;
				}
				case 'customer.subscription.deleted': {
					const handler = makeCustomerSubscriptionDeletedHandler();
					await handler.execute(event);
					break;
				}
			}
		} catch {
			throw new BadRequestException('Failed to process event handler.');
		}

		return { ok: true };
	}

	private async validateSignature({
		rawBody,
		stripeSignature,
	}: StripeWebhookInput) {
		try {
			const event = await stripe.webhooks.constructEventAsync(
				rawBody,
				stripeSignature,
				env.STRIPE_WEBHOOK_SECRET,
			);

			return event;
		} catch (err) {
			throw new BadRequestException('Invalid Stripe signature');
		}
	}

	private relevantEventTypes = new Set([
		'checkout.session.completed',
		'customer.subscription.updated',
		'customer.subscription.deleted',
		'invoice.payment_failed',
	]);
}
