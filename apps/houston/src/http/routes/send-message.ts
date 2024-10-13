import { Elysia, t } from 'elysia';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import {
	AIMessage,
	createChainFromMemories,
	createQDrantFilter,
	decideQuestionType,
	generateTitleFromChatMessages,
	HumanMessage,
} from '@sensor-it/langchain';

import { textStream } from '@/http/core/http-stream';

import { chats, db, messages } from '@/db';

import { auth } from '../auth';

interface ChatMessage {
	role: 'user' | 'assistant';
	text: string;
}

export const sendMessage = new Elysia().use(auth).post(
	'/messages',
	async ({ body, getCurrentUserId }) => {
		const { chatId, chatContext, text } = body;

		const atlasUserId = await getCurrentUserId();

		const isNewChat = !chatId;

		let conversationMemory: ChatMessage[] = [];
		let currentChatId = chatId;

		if (!currentChatId) {
			const [chat] = await db
				.insert(chats)
				.values({
					atlasUserId,
					title: 'New chat',
				})
				.returning({ id: chats.id });

			currentChatId = chat.id;
		}

		if (currentChatId) {
			conversationMemory = await db.query.messages.findMany({
				where: (fields, { eq }) => eq(fields.chatId, currentChatId),
				columns: {
					role: true,
					text: true,
				},
				orderBy: (fields, { asc }) => asc(fields.createdAt),
			});
		}

		const conversationMemoryMapped = conversationMemory.map((memory) => {
			if (memory.role === 'user') {
				return new HumanMessage(memory.text);
			}

			return new AIMessage(memory.text);
		});

		const questionType = await decideQuestionType(
			conversationMemoryMapped,
			text,
		);

		const responseMessageId = nanoid();

		const userMessageId = nanoid();

		await db.insert(messages).values({
			id: userMessageId,
			chatId: currentChatId,
			role: 'user',
			text,
			questionType,
		});

		const filtersToApply = [
			createQDrantFilter(
				'metadata.atlasOrganizationSlug',
				chatContext?.atlasOrganizationSlug,
			),
		].filter((filter) => filter !== null);

		return textStream(
			async (stream) => {
				const houston = await createChainFromMemories(
					conversationMemoryMapped,
					{
						questionType,
						filter: filtersToApply && {
							should: filtersToApply,
						},
					},
				);

				const response = await houston.call(
					{ question: text },
					{
						callbacks: [
							{
								handleLLMNewToken: (token) => {
									stream.write(token);
								},
							},
						],
					},
				);

				if (!currentChatId) {
					throw new Error('Chat ID not found');
				}

				await db.insert(messages).values({
					id: responseMessageId,
					chatId: currentChatId,
					role: 'assistant',
					text: response.text,
				});

				if (isNewChat) {
					const generateTitle = generateTitleFromChatMessages([
						{ role: 'user', text },
						{ role: 'assistant', text: response.text },
					]);

					const titleResponse = await generateTitle.call({ additional: ' ' });

					const title = titleResponse.text.endsWith('.')
						? titleResponse.text.slice(0, -1)
						: titleResponse.text;

					await db
						.update(chats)
						.set({ title })
						.where(eq(chats.id, currentChatId));
				}
			},
			{
				'X-Houston-ChatId': currentChatId,
				'X-Houston-UserMessageId': userMessageId.toString(),
				'X-Houston-AssistantMessageId': responseMessageId.toString(),
			},
		);
	},
	{
		body: t.Object({
			text: t.String(),
			chatId: t.Optional(t.String({ format: 'uuid' })),
			chatContext: t.Object({
				atlasOrganizationSlug: t.String(),
			}),
		}),
	},
);
