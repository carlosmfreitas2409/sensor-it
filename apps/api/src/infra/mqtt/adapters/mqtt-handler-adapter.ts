import type { IMqttHandler } from '@sensor-it/core';

export const adaptMqttHandler = (handler: IMqttHandler) => {
	return async (message: Buffer) => {
		await handler.handle(JSON.parse(message.toString()));
	};
};
