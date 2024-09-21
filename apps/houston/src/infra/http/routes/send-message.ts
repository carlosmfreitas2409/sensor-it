import { Elysia, t } from 'elysia';
import { Snowflake } from 'nodejs-snowflake';

import {
	AIMessage,
	createChainFromMemories,
	createQDrantFilter,
	decideQuestionTool,
	HumanMessage,
	openAiChat,
} from '@sensor-it/langchain';

import { chats, db, messages } from '@/infra/db';
import { textStream } from './http-stream';

interface ChatMessage {
	role: 'user' | 'assistant';
	text: string;
}

export const sendMessage = new Elysia().post(
	'/messages',
	async ({ body }) => {
		const { chatId, chatContext, text } = body;

		const snowflake = new Snowflake();

		const atlasUserId = 'c7fd6a7f-172b-4e05-853e-3125c6093293'; // TODO: get from auth

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
		} else {
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

		const openAiChatWithTools = openAiChat.bindTools([decideQuestionTool]);

		const decideQuestionTypeResult = await openAiChatWithTools.invoke([
			...conversationMemoryMapped,
			new HumanMessage(text),
		]);

		const questionType =
			decideQuestionTypeResult.tool_calls?.[0].args.type || 'monitoring';

		const responseMessageId = snowflake.getUniqueID() as bigint;

		const userMessageId = snowflake.getUniqueID() as bigint;

		await db.insert(messages).values({
			id: userMessageId,
			chatId: currentChatId,
			role: 'user',
			text,
			questionType,
		});

		const filtersToApply = [
			createQDrantFilter(
				'metadata.atlasOrganizationId',
				chatContext?.atlasOrganizationId,
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

				const response = await houston.invoke(text, {
					callbacks: [
						{
							handleLLMNewToken: (token) => {
								stream.writeJson({ token });
							},
						},
					],
				});

				if (!currentChatId) {
					throw new Error('Chat ID not found');
				}

				await db.insert(messages).values({
					id: responseMessageId,
					chatId: currentChatId,
					role: 'assistant',
					text: response,
				});
			},
			{
				'Houston-ChatId': currentChatId,
				'Houston-UserMessageId': userMessageId.toString(),
				'Houston-AssistantMessageId': responseMessageId.toString(),
			},
		);
	},
	{
		body: t.Object({
			text: t.String(),
			chatId: t.Optional(t.String({ format: 'uuid' })),
			chatContext: t.Object({
				atlasOrganizationId: t.String(),
			}),
		}),
	},
);
