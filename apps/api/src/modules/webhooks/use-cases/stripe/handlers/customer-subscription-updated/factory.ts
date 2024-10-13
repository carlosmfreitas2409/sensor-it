import { DrizzleOrganizationRepository } from '@/modules/organizations/repositories/drizzle/organization-repository';

import { CustomerSubscriptionUpdatedHandler } from './handler';

export function makeCustomerSubscriptionUpdatedHandler() {
	const organizationRepository = new DrizzleOrganizationRepository();

	const handler = new CustomerSubscriptionUpdatedHandler(
		organizationRepository,
	);

	return handler;
}
