import { Elysia, t } from 'elysia';

import { db } from '@/db';

import { auth } from '../auth';

export const getChatById = new Elysia().use(auth).get(
	'/chats/:chatId',
	async ({ params, set, getCurrentUserId }) => {
		const atlasUserId = await getCurrentUserId();

		const chat = await db.query.chats.findFirst({
			where: (fields, { and, eq }) =>
				and(eq(fields.id, params.chatId), eq(fields.atlasUserId, atlasUserId)),
			columns: {
				id: true,
				title: true,
			},
			with: {
				messages: {
					columns: {
						id: true,
						role: true,
						text: true,
						createdAt: true,
					},
					orderBy: (fields, { asc }) => asc(fields.createdAt),
				},
			},
		});

		if (!chat) {
			throw new Error('Chat not found');
		}

		set.status = 200;

		return {
			...chat,
			authorId: atlasUserId,
		};
	},
	{
		params: t.Object({
			chatId: t.String({ format: 'uuid' }),
		}),
	},
);
