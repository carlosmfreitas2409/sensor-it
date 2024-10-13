import { redirect } from 'next/navigation';
import { createStreamableValue, getMutableAIState } from 'ai/rsc';
import { nanoid } from 'nanoid';

import type { ChatMessage } from '@/entities/chat';
import { SpinnerMessage } from '@/components/ai-stocks/spinner-message';
import { AssistantMessage } from '@/components/ai-stocks/assistant-message';

import { getOrganizationSlug } from '../auth';

import { streamUI } from './stream-ui';

import type { AI } from './provider';

export async function submitUserMessage(prompt: string, chatId: string | null) {
	'use server';

	const organizationSlug = getOrganizationSlug();

	if (!organizationSlug) {
		redirect('/auth/sign-in');
	}

	const messages = getMutableAIState<AI>('messages');

	messages.update([
		...(messages.get() as ChatMessage[]),
		{
			id: nanoid(),
			role: 'user',
			text: prompt,
			createdAt: new Date(),
		},
	]);

	const textStream = createStreamableValue('');

	const result = await streamUI({
		chatId,
		prompt,
		organizationSlug,
		initial: <SpinnerMessage />,
		text: ({ content, done }) => {
			if (done) {
				textStream.done();

				messages.done([
					...(messages.get() as ChatMessage[]),
					{
						id: nanoid(),
						role: 'assistant',
						text: content,
						createdAt: new Date(),
					},
				]);
			} else {
				textStream.update(content);
			}

			return <AssistantMessage content={textStream.value} />;
		},
	});

	return {
		chatId: result.chatId,
		message: {
			id: result.id,
			display: result.value,
		},
	};
}
