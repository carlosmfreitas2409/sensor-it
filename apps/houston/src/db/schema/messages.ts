import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { chats } from './chats';

export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant']);

export const messages = pgTable('messages', {
	id: text('id').primaryKey(),
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

export const messagesRelations = relations(messages, ({ one }) => ({
	chat: one(chats, {
		fields: [messages.chatId],
		references: [chats.id],
		relationName: 'message_chat',
	}),
}));
