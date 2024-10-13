import { DrizzleOrganizationRepository } from '@/modules/organizations/repositories/drizzle/organization-repository';

import { CustomerSubscriptionDeletedHandler } from './handler';

export function makeCustomerSubscriptionDeletedHandler() {
	const organizationRepository = new DrizzleOrganizationRepository();

	const handler = new CustomerSubscriptionDeletedHandler(
		organizationRepository,
	);

	return handler;
}
