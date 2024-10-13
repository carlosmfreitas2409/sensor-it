import type Stripe from 'stripe';

import type { IOrganizationRepository } from '@/modules/organizations/repositories/interfaces/organization-repository';

import type {
	ICustomerSubscriptionDeletedHandler,
	CustomerSubscriptionDeletedInput,
} from './dto';

export class CustomerSubscriptionDeletedHandler
	implements ICustomerSubscriptionDeletedHandler
{
	constructor(
		private readonly organizationRepository: IOrganizationRepository,
	) {}

	async execute(event: CustomerSubscriptionDeletedInput): Promise<void> {
		const subscription = event.data.object as Stripe.Subscription;

		const stripeCustomerId = subscription.customer.toString();

		const organization =
			await this.organizationRepository.findByStripeCustomerId(
				stripeCustomerId,
			);

		if (!organization) {
			throw new Error('Organization not found');
		}

		await this.organizationRepository.updatePlan(
			organization.slug,
			stripeCustomerId,
			'free',
		);
	}
}
