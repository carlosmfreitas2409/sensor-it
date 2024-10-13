import { DrizzleOrganizationRepository } from '@/modules/organizations/repositories/drizzle/organization-repository';

import { CheckoutSessionCompletedHandler } from './handler';

export function makeCheckoutSessionCompletedHandler() {
	const organizationRepository = new DrizzleOrganizationRepository();

	const handler = new CheckoutSessionCompletedHandler(organizationRepository);

	return handler;
}
