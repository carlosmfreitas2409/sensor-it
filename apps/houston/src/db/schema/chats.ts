import { relations } from 'drizzle-orm';
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { messages } from './messages';

export const chats = pgTable(
	'chats',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		title: text('title').notNull(),
		atlasUserId: uuid('atlas_user_id').notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
	},
	(table) => ({
		atlasUserIdIdx: index('atlas_user_id_idx').on(table.atlasUserId),
	}),
);

export const chatsRelations = relations(chats, ({ many }) => ({
	messages: many(messages),
}));
