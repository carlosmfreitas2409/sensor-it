import { ChatProvider } from './contexts/chat-provider';

export default function ChatLayout({
	children,
}: { children: React.ReactNode }) {
	return <ChatProvider>{children}</ChatProvider>;
}
