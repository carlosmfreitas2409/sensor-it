import { houstonApi } from '@/lib/http-clients/houston';

import type { Chat } from '@/entities/chat';

type GetChatResponse = Chat;

export async function getChat(chatId: string) {
	const response = await houstonApi
		.get(`chats/${chatId}`)
		.json<GetChatResponse>();

	return response;
}
