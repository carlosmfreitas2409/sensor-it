import type { IMqttHandler } from '@/core/infra/mqtt-handler';

export const adaptMqttHandler = (handler: IMqttHandler) => {
	return async (message: Buffer) => {
		await handler.handle(JSON.parse(message.toString()));
	};
};
