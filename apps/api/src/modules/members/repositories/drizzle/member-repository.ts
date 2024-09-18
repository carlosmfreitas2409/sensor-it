import { and, eq } from 'drizzle-orm';

import {
	db,
	members,
	organizations,
	type InsertMember,
	type Member,
} from '@/infra/db';

import type {
	IMemberRepository,
	Membership,
	UserMember,
} from '../interfaces/member-repository';

export class DrizzleMemberRepository implements IMemberRepository {
	public drizzle = db;

	async findMembership(
		userId: string,
		slug: string,
	): Promise<Membership | null> {
		const [membership] = await this.drizzle
			.select({
				organization: organizations,
				membership: members,
			})
			.from(members)
			.where(and(eq(members.userId, userId), eq(organizations.slug, slug)))
			.innerJoin(organizations, eq(members.organizationId, organizations.id));

		return membership;
	}

	async listByOrganizationId(organizationId: string): Promise<UserMember[]> {
		const members = await this.drizzle.query.members.findMany({
			where: (fields, { eq }) => eq(fields.organizationId, organizationId),
			orderBy: (fields, { asc }) => asc(fields.role),
			columns: {
				id: true,
				role: true,
				userId: true,
			},
			with: {
				user: {
					columns: {
						name: true,
						email: true,
						avatarUrl: true,
					},
				},
			},
		});

		const membersWithRoles = members.map(({ user, ...member }) => ({
			...member,
			...user,
		}));

		return membersWithRoles;
	}

	async create(dto: InsertMember): Promise<Member | null> {
		const [member] = await this.drizzle.insert(members).values(dto);

		return member;
	}
}
