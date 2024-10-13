'use client';

import { createContext, useCallback, useState, useContext } from 'react';

interface ChatProviderProps {
	children: React.ReactNode;
}

interface ChatContextData {
	activeChatId: string | null;
	setActiveChatId: (id: string | null) => void;
}

const ChatContext = createContext({} as ChatContextData);

export function ChatProvider({ children }: ChatProviderProps) {
	const [activeChatId, setActiveChatId] = useState<string | null>(null);

	const setActiveChatIdFn = useCallback((id: string | null) => {
		setActiveChatId(id);
	}, []);

	return (
		<ChatContext.Provider
			value={{
				activeChatId,
				setActiveChatId: setActiveChatIdFn,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}

export function useChat() {
	const context = useContext(ChatContext);

	if (!context) {
		throw new Error('useChat cannot be use outside ChatProvider');
	}

	return context;
}
