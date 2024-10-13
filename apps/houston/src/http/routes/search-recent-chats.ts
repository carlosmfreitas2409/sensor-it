import { Elysia, t } from 'elysia';
import { and, desc, eq, ilike, sql } from 'drizzle-orm';

import { chats, db } from '@/db';

import { auth } from '../auth';

export const searchRecentChats = new Elysia().use(auth).get(
	'/chats',
	async ({ query, set, getCurrentUserId }) => {
		const { search } = query;

		const pageSize = Number(query.pageSize);
		const pageIndex = Number(query.pageIndex);

		const atlasUserId = await getCurrentUserId();

		const [results, countResult] = await Promise.all([
			db
				.select({
					id: chats.id,
					title: chats.title,
					createdAt: chats.createdAt,
				})
				.from(chats)
				.where(
					and(
						eq(chats.atlasUserId, atlasUserId),
						search ? ilike(chats.title, `%${search}%`) : undefined,
					),
				)
				.orderBy(desc(chats.createdAt))
				.limit(pageSize)
				.offset(pageSize * pageIndex),
			db
				.select({ count: sql<number>`count(*)` })
				.from(chats)
				.where(
					and(
						eq(chats.atlasUserId, atlasUserId),
						search ? ilike(chats.title, `%${search}%`) : undefined,
					),
				),
		]);

		set.status = 200;

		return {
			totalCount: countResult[0].count,
			chats: results,
		};
	},
	{
		query: t.Object({
			search: t.Optional(t.String()),
			pageIndex: t.String(),
			pageSize: t.String(),
		}),
	},
);
