import { houstonApi } from '@/lib/http-clients/houston';

import type { Chat } from '@/entities/chat';

type SearchRecentChatsInput = {
	pageSize: number;
	pageIndex: number;
	search?: string;
};

type SearchRecentChatsResponse = {
	chats: Chat[];
	totalCount: number;
};

export async function searchRecentChats(params: SearchRecentChatsInput) {
	const response = await houstonApi
		.get('chats', { searchParams: params })
		.json<SearchRecentChatsResponse>();

	return response;
}
