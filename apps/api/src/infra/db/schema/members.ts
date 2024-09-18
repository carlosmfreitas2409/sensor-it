import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from 'drizzle-orm';
import { pgEnum, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { roleSchema } from '@sensor-it/auth';

import { organizations } from './organizations';
import { users } from './users';

export type Member = InferSelectModel<typeof members>;
export type InsertMember = InferInsertModel<typeof members>;

export const memberRoleEnum = pgEnum('member_role', roleSchema.options);

export const members = pgTable(
	'members',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		role: memberRoleEnum('role').notNull().default('MEMBER'),
		organizationId: uuid('organization_id')
			.notNull()
			.references(() => organizations.id, { onDelete: 'cascade' }),
		userId: uuid('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
	},
	(table) => ({
		organizationIdUserIdKey: uniqueIndex(
			'members_organization_id_user_id_key',
		).on(table.organizationId, table.userId),
	}),
);

export const membersRelations = relations(members, ({ one }) => ({
	organization: one(organizations, {
		fields: [members.organizationId],
		references: [organizations.id],
		relationName: 'member_organization',
	}),
	user: one(users, {
		fields: [members.userId],
		references: [users.id],
		relationName: 'member_user',
	}),
}));
