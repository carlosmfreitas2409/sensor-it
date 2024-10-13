import { env } from '@sensor-it/env/server';

import { stripe } from '@/infra/lib/stripe';

import { NotFoundException } from '@/infra/http/errors';

import type { IUserRepository } from '@/modules/users/repositories/interfaces/user-repository';

import type { IOrganizationRepository } from '../../repositories/interfaces/organization-repository';

import type {
	IUpgradePlanUseCase,
	UpgradePlanInput,
	UpgradePlanOutput,
} from './dto';

export class UpgradePlanUseCase implements IUpgradePlanUseCase {
	constructor(
		private readonly organizationRepository: IOrganizationRepository,
		private readonly userRepository: IUserRepository,
	) {}

	async execute({
		organizationSlug,
		userId,
		planKey,
		period,
		cancelPath,
	}: UpgradePlanInput): Promise<UpgradePlanOutput> {
		const [user, organization] = await Promise.all([
			this.userRepository.findById(userId),
			this.organizationRepository.findBySlug(organizationSlug),
		]);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (!organization) {
			throw new NotFoundException('Organization not found');
		}

		const prices = await stripe.prices.list({
			lookup_keys: [planKey],
		});

		const priceId = prices.data[0].id;

		const subscription = organization.stripeCustomerId
			? await stripe.subscriptions.list({
					customer: organization.stripeCustomerId,
					status: 'active',
				})
			: null;

		if (
			organization.stripeCustomerId &&
			subscription &&
			subscription.data.length > 0
		) {
			const { url } = await stripe.billingPortal.sessions.create({
				locale: 'pt-BR',
				customer: organization.stripeCustomerId,
				return_url: `${env.APP_DOMAIN}${cancelPath || ''}`,
				flow_data: {
					type: 'subscription_update_confirm',
					subscription_update_confirm: {
						subscription: subscription.data[0].id,
						items: [
							{
								id: subscription.data[0].items.data[0].id,
								price: priceId,
								quantity: 1,
							},
						],
					},
				},
			});

			return { url };
		}

		const stripeSession = await stripe.checkout.sessions.create({
			locale: 'pt-BR',
			customer_email: user.email,
			success_url: `${env.APP_DOMAIN}/${organizationSlug}?upgraded=true&plan=${planKey}&period=${period}`,
			cancel_url: `${env.APP_DOMAIN}${cancelPath || ''}`,
			billing_address_collection: 'required',
			line_items: [{ price: priceId, quantity: 1 }],
			allow_promotion_codes: true,
			mode: 'subscription',
			client_reference_id: organizationSlug,
			metadata: {
				atlasCustomerId: userId,
			},
		});

		return { sessionId: stripeSession.id };
	}
}
