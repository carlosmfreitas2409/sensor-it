import type Stripe from 'stripe';

import { PLANS } from '@sensor-it/utils/constants';

import { stripe } from '@/infra/lib/stripe';

import type { IOrganizationRepository } from '@/modules/organizations/repositories/interfaces/organization-repository';

import type {
	ICheckoutSessionCompletedHandler,
	CheckoutSessionCompletedInput,
} from './dto';

export class CheckoutSessionCompletedHandler
	implements ICheckoutSessionCompletedHandler
{
	constructor(
		private readonly organizationRepository: IOrganizationRepository,
	) {}

	async execute(event: CheckoutSessionCompletedInput): Promise<void> {
		const session = event.data.object as Stripe.Checkout.Session;

		if (!session.client_reference_id || !session.customer) {
			throw new Error('Invalid customer');
		}

		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string,
		);

		const planKey = subscription.items.data[0].price.lookup_key?.split('_')[0];

		const plan = PLANS.find((plan) => plan.key === planKey);

		if (!plan) {
			throw new Error('Plan not found');
		}

		const organizationSlug = session.client_reference_id;
		const stripeCustomerId = session.customer as string;

		await this.organizationRepository.updatePlan(
			organizationSlug,
			stripeCustomerId,
			plan.key,
		);
	}
}
