import type { Organization } from '@sensor-it/db';

import type { OrganizationWithUserRole } from '../../dtos/repositories/organization-with-user-role';

export interface IOrganizationRepository {
	listWithUserRole(userId: string): Promise<OrganizationWithUserRole[]>;
	findByDomainAndAttachAllowed(domain: string): Promise<Organization | null>;
}

export type { OrganizationWithUserRole };
