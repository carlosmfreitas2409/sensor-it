import { houstonApi } from '@/lib/http-clients/houston';

type SendMessageRequest = {
	text: string;
	chatId?: string;
	chatContext: {
		atlasOrganizationSlug: string;
	};
};

export async function sendMessage(body: SendMessageRequest) {
	const response = await houstonApi.post('messages', {
		json: body,
		timeout: false,
	});

	return response;
}
