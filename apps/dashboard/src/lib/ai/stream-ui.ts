import { createStreamableUI } from 'ai/rsc';

import { sendMessage } from '@/services/chats/send-message';

type Renderer<T extends Array<unknown>> = (
	...args: T
) => React.ReactNode | Promise<React.ReactNode>;

type StreamUI = {
	chatId: string | null;
	prompt: string;
	organizationSlug: string;
	text: Renderer<[{ content: string; done: boolean; delta: string }]>;
	initial: React.ReactNode;
};

export async function streamUI({
	chatId,
	prompt,
	organizationSlug,
	text: textRender,
	initial,
}: StreamUI) {
	const ui = createStreamableUI(initial);

	async function render({
		args,
		renderer,
		streamableUI,
		isLastCall = false,
	}: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		renderer: Renderer<any>;
		args: [payload: unknown];
		streamableUI: ReturnType<typeof createStreamableUI>;
		isLastCall?: boolean;
	}) {
		const node = await renderer(...args);

		if (isLastCall) {
			streamableUI.done(node);
		} else {
			streamableUI.update(node);
		}
	}

	const response = await sendMessage({
		text: prompt,
		chatId: chatId || undefined,
		chatContext: {
			atlasOrganizationSlug: organizationSlug,
		},
	});

	const newChatId = response.headers.get('X-Houston-ChatId');
	const assistantMessageId = response.headers.get(
		'X-Houston-AssistantMessageId',
	);

	if (!assistantMessageId || !newChatId) {
		throw new Error('Houston did not return metadata');
	}

	(async () => {
		if (!response.body) {
			throw new Error('Houston did not return a stream');
		}

		try {
			let content = '';

			const textDecoder = new TextDecoder();

			const reader = response.body.getReader();

			while (true) {
				const { value, done } = await reader.read();

				if (done) {
					break;
				}

				const textDelta = textDecoder.decode(value);

				content += textDelta;

				render({
					renderer: textRender,
					args: [{ content, done: false, delta: textDelta }],
					streamableUI: ui,
				});
			}

			render({
				renderer: textRender,
				args: [{ content, done: true }],
				streamableUI: ui,
				isLastCall: true,
			});
		} catch (error) {
			ui.error(error);
		}
	})();

	return {
		id: assistantMessageId,
		value: ui.value,
		chatId: newChatId,
		stream: response.body,
	};
}
