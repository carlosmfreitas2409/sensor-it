import { count, eq } from 'drizzle-orm';

import {
	db,
	devices,
	members,
	organizations,
	type Organization,
	type InsertOrganization,
} from '@/infra/db';

import type {
	IOrganizationRepository,
	OrganizationWithUserRole,
} from '../interfaces/organization-repository';

export class DrizzleOrganizationRepository implements IOrganizationRepository {
	public drizzle = db;

	async listWithUserRole(userId: string): Promise<OrganizationWithUserRole[]> {
		const organizationsWithUserRole = await this.drizzle
			.select({
				id: organizations.id,
				name: organizations.name,
				slug: organizations.slug,
				avatarUrl: organizations.avatarUrl,
				role: members.role,
				devices: count(devices.id),
			})
			.from(organizations)
			.where(eq(members.userId, userId))
			.innerJoin(members, eq(organizations.id, members.organizationId))
			.leftJoin(devices, eq(organizations.id, devices.organizationId))
			.groupBy(organizations.id, members.role);

		return organizationsWithUserRole;
	}

	async findBySlug(slug: string): Promise<Organization | null> {
		const organization = await this.drizzle.query.organizations.findFirst({
			where: (fields, { eq }) => eq(fields.slug, slug),
		});

		if (!organization) {
			return null;
		}

		return organization;
	}

	async findByDomain(domain: string): Promise<Organization | null> {
		const organization = await this.drizzle.query.organizations.findFirst({
			where: (fields, { eq }) => eq(fields.domain, domain),
		});

		if (!organization) {
			return null;
		}

		return organization;
	}

	async findByDomainAndAttachAllowed(
		domain: string,
	): Promise<Organization | null> {
		const organization = await this.drizzle.query.organizations.findFirst({
			where: (fields, { and, eq }) =>
				and(
					eq(fields.domain, domain),
					eq(fields.shouldAttachUsersByDomain, true),
				),
		});

		if (!organization) {
			return null;
		}

		return organization;
	}

	async findByStripeCustomerId(
		stripeCustomerId: string,
	): Promise<Organization | null> {
		const organization = await this.drizzle.query.organizations.findFirst({
			where: (fields, { eq }) => eq(fields.stripeCustomerId, stripeCustomerId),
		});

		if (!organization) {
			return null;
		}

		return organization;
	}

	async create(dto: InsertOrganization): Promise<Organization> {
		const [organization] = await this.drizzle
			.insert(organizations)
			.values(dto)
			.returning();

		return organization;
	}

	async updatePlan(
		slug: string,
		stripeCustomerId: string,
		plan: string,
	): Promise<void> {
		await this.drizzle
			.update(organizations)
			.set({ stripeCustomerId, plan })
			.where(eq(organizations.slug, slug));
	}
}
