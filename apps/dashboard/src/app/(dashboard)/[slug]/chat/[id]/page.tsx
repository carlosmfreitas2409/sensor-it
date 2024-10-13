import { redirect } from 'next/navigation';

import { AIProvider } from '@/lib/ai/provider';

import { getChat } from '@/services/chats/get-chat';

import { Chat } from '../components/chat';
import { ChatSidebar } from '../components/chat-sidebar';

interface ChatPageProps {
	params: {
		id: string;
	};
}

export default async function ChatPage({ params }: ChatPageProps) {
	const chat = await getChat(params.id);

	if (!chat) {
		redirect('/');
	}

	return (
		<AIProvider
			initialAIState={{
				chatId: chat.id,
				authorId: chat.authorId,
				messages: chat.messages,
			}}
		>
			<Chat />
			<ChatSidebar />
		</AIProvider>
	);
}
