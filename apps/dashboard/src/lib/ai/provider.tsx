import { createAI, getAIState } from 'ai/rsc';

import type { ChatMessage } from '@/entities/chat';

import { UserMessage } from '@/components/ai-stocks/user-message';
import { AssistantMessage } from '@/components/ai-stocks/assistant-message';

import { getUserViaToken } from '../auth';

import { submitUserMessage } from './submit-user-message';

type AIState = {
	chatId?: string;
	authorId: string;
	messages: ChatMessage[];
};

type UIState = Array<{
	id: string;
	display: React.ReactNode;
}>;

type AIActions = {
	submitUserMessage: typeof submitUserMessage;
};

export type AI = typeof AIProvider;

export const AIProvider = createAI<AIState, UIState, AIActions>({
	actions: {
		submitUserMessage,
	},
	initialUIState: [],
	initialAIState: { chatId: undefined, authorId: '', messages: [] },
	onGetUIState: async () => {
		'use server';

		const { user } = await getUserViaToken();

		const aiState = getAIState<AI>();

		if (!aiState) {
			return [];
		}

		const uiState: UIState = aiState.messages.map((message) => {
			if (message.role === 'user') {
				return {
					id: message.id,
					display: <UserMessage author={user}>{message.text}</UserMessage>,
				};
			}

			if (message.role === 'assistant') {
				return {
					id: message.id,
					display: <AssistantMessage content={message.text} />,
				};
			}

			return {
				id: message.id,
				display: null,
			};
		});

		return uiState;
	},
});
