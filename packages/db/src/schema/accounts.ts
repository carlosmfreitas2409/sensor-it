import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgEnum, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export type Account = InferSelectModel<typeof accounts>;
export type InsertAccount = InferInsertModel<typeof accounts>;

export const accountProviderEnum = pgEnum('account_provider', ['GOOGLE']);

export const accounts = pgTable(
	'accounts',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		provider: accountProviderEnum('provider').notNull(),
		providerAccountId: text('provider_account_id').notNull().unique(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
	},
	(table) => ({
		providerUserIdKey: uniqueIndex('accounts_provider_user_id_key').on(
			table.provider,
			table.userId,
		),
	}),
);
