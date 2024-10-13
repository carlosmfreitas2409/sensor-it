import type { InsertOrganization, Organization } from '@/infra/db';

import type { OrganizationWithUserRole } from '../../dtos/repositories/organization-with-user-role';

export interface IOrganizationRepository {
	listWithUserRole(userId: string): Promise<OrganizationWithUserRole[]>;
	findBySlug(slug: string): Promise<Organization | null>;
	findByDomain(domain: string): Promise<Organization | null>;
	findByDomainAndAttachAllowed(domain: string): Promise<Organization | null>;
	findByStripeCustomerId(
		stripeCustomerId: string,
	): Promise<Organization | null>;
	create(organization: InsertOrganization): Promise<Organization>;
	updatePlan(
		slug: string,
		stripeCustomerId: string,
		plan: string,
	): Promise<void>;
}

export type { OrganizationWithUserRole };
