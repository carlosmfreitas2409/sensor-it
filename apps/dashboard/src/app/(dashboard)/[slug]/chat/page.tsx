import { AIProvider } from '@/lib/ai/provider';

import { Chat } from './components/chat';
import { ChatSidebar } from './components/chat-sidebar';

export default function ChatPage() {
	return (
		<AIProvider>
			<Chat />
			<ChatSidebar />
		</AIProvider>
	);
}
