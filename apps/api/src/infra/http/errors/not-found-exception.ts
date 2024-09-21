import { HttpException } from '@sensor-it/core';

export class NotFoundException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 404,
			message,
		});
	}
}
