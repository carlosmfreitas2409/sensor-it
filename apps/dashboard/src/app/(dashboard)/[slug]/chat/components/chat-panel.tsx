'use client';

import type { FormEvent } from 'react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';

import type { User } from '@/entities/user';

import type { AI } from '@/lib/ai/provider';

import { useEnterSubmit } from '@/hooks/use-enter-submit';
import { useOrganization } from '@/hooks/use-organization';

import { Send } from '@sensor-it/ui/icons';
import { Button, Textarea } from '@sensor-it/ui/components';

import { UserMessage } from '@/components/ai-stocks/user-message';

import { useChat } from '../contexts/chat-provider';

interface FormElements extends HTMLFormControlsCollection {
	readonly message: HTMLTextAreaElement;
}

interface ChatFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

interface ChatPanelProps {
	currentUser: User;
}

export function ChatPanel({ currentUser }: ChatPanelProps) {
	const { slug } = useOrganization();

	const { activeChatId, setActiveChatId } = useChat();

	const { formRef, onKeyDown } = useEnterSubmit();
	const { submitUserMessage } = useActions<AI>();

	const [ai] = useAIState<AI>();
	const [_, setMessages] = useUIState<AI>();

	async function onSendMessage(event: FormEvent<ChatFormElement>) {
		event.preventDefault();

		const { message } = event.currentTarget.elements;

		if (window.innerWidth < 600) {
			message.blur();
		}

		const value = message.value.trim();

		if (!value) return;

		message.value = '';

		setMessages((currentMessages) => [
			...currentMessages,
			{
				id: nanoid(),
				display: <UserMessage author={currentUser}>{value}</UserMessage>,
			},
		]);

		const { chatId: newChatId, message: messageResponse } =
			await submitUserMessage(value, ai.chatId || activeChatId);

		setMessages((currentMessages) => [...currentMessages, messageResponse]);

		if (newChatId !== activeChatId) {
			setActiveChatId(newChatId);

			window.history.pushState({}, '', `/${slug}/chat/${newChatId}`);
		}
	}

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-2.5 px-8 pb-4">
			<form ref={formRef} onSubmit={onSendMessage} className="w-full">
				<div className="relative w-full">
					<Textarea
						name="message"
						className="h-12 min-h-12 resize-none py-3 pr-12"
						placeholder="Diga-me o que você deseja?"
						tabIndex={0}
						spellCheck={false}
						autoComplete="off"
						autoCorrect="off"
						rows={1}
						autoFocus
						onKeyDown={onKeyDown}
					/>
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-2 right-2 size-8"
					>
						<Send className="size-4" />
					</Button>
				</div>
			</form>

			<span className="text-muted-foreground text-xs">
				O SensorChat pode cometer erros. Considere verificar informações
				importantes.
			</span>
		</div>
	);
}
