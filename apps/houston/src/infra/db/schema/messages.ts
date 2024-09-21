import {
	bigint,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';

import { chats } from './chats';

export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant']);

export const messages = pgTable('messages', {
	id: bigint('id', { mode: 'bigint' }).primaryKey(),
	chatId: uuid('chat_id')
		.notNull()
		.references(() => chats.id, { onDelete: 'cascade' }),
	role: messageRoleEnum('role').notNull().default('user'),
	questionType: text('question_type'),
	text: text('text').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
});
