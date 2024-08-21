import type { InsertMember, Member, Organization, User } from '@sensor-it/db';

interface Membership {
	organization: Organization;
	membership: Member;
}

type UserMember = Omit<Member, 'organizationId'> &
	Pick<User, 'name' | 'email' | 'avatarUrl'>;

interface IMemberRepository {
	findMembership(userId: string, slug: string): Promise<Membership | null>;
	listByOrganizationId(organizationId: string): Promise<UserMember[]>;
	create(member: InsertMember): Promise<Member | null>;
}

export type { IMemberRepository, Membership, UserMember };
