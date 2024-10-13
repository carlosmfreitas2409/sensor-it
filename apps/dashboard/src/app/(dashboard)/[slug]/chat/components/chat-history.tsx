import { cache } from 'react';
import { intlFormatDistance } from 'date-fns';

import type { Chat } from '@/entities/chat';

import { searchRecentChats } from '@/services/chats/search-recent-chats';

import { getOrganizationSlug } from '@/lib/auth';

import { ScrollArea } from '@sensor-it/ui/components';

import { ChatHistoryItem } from './chat-history-item';

interface DistanceChatGroup {
	name: string;
	chats: Chat[];
}

const loadChats = cache(async (pageIndex: number, pageSize: number) => {
	return await searchRecentChats({
		pageIndex,
		pageSize,
	});
});

export async function ChatHistory() {
	const slug = getOrganizationSlug();

	const { chats } = await loadChats(0, 10);

	const groupedChats = chats.reduce((acc, chat) => {
		const distance = intlFormatDistance(chat.createdAt, new Date(), {
			locale: 'pt-BR',
		});

		const groupIndex = acc.findIndex((group) => group.name === distance);

		if (groupIndex !== -1) {
			acc[groupIndex]?.chats.push(chat);
			return acc;
		}

		acc.push({ name: distance, chats: [chat] });

		return acc;
	}, [] as DistanceChatGroup[]);

	return (
		<ScrollArea className="flex-1">
			<nav className="flex flex-col gap-5">
				{groupedChats.map((group, index) => (
					<div key={index}>
						<div className="mx-3 flex h-9 items-center">
							<h3 className="truncate px-2 pt-3 pb-2 font-semibold text-xs capitalize">
								{group.name}
							</h3>
						</div>

						<ol className="mx-2 space-y-1">
							{group.chats.map((chat, index) => (
								<ChatHistoryItem
									key={chat.id}
									index={index}
									slug={slug}
									chat={chat}
								/>
							))}
						</ol>
					</div>
				))}
			</nav>
		</ScrollArea>
	);
}
