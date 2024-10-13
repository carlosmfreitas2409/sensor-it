import type Stripe from 'stripe';

import { PLANS } from '@sensor-it/utils/constants';

import type { IOrganizationRepository } from '@/modules/organizations/repositories/interfaces/organization-repository';

import type {
	ICustomerSubscriptionUpdatedHandler,
	CustomerSubscriptionUpdatedInput,
} from './dto';

export class CustomerSubscriptionUpdatedHandler
	implements ICustomerSubscriptionUpdatedHandler
{
	constructor(
		private readonly organizationRepository: IOrganizationRepository,
	) {}

	async execute(event: CustomerSubscriptionUpdatedInput): Promise<void> {
		const subscription = event.data.object as Stripe.Subscription;

		const planKey = subscription.items.data[0].price.lookup_key?.split('_')[0];

		const plan = PLANS.find((plan) => plan.key === planKey);

		if (!plan) {
			throw new Error('Plan not found');
		}

		const stripeCustomerId = subscription.customer.toString();

		const organization =
			await this.organizationRepository.findByStripeCustomerId(
				stripeCustomerId,
			);

		if (!organization) {
			throw new Error('Organization not found');
		}

		const newPlanKey = plan.key;

		if (organization.plan !== newPlanKey) {
			await this.organizationRepository.updatePlan(
				organization.slug,
				stripeCustomerId,
				newPlanKey,
			);
		}
	}
}
