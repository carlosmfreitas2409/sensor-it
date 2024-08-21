import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export type Organization = InferSelectModel<typeof organizations>;
export type InsertOrganization = InferInsertModel<typeof organizations>;

export const organizations = pgTable('organizations', {
	id: uuid('id').defaultRandom().primaryKey(),
	ownerId: uuid('owner_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	domain: text('domain').notNull().unique(),
	shouldAttachUsersByDomain: boolean('should_attach_users_by_domain')
		.notNull()
		.default(false),
	avatarUrl: text('avatar_url'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});
