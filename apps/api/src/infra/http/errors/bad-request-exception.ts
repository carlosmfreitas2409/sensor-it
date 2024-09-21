import { HttpException } from '@sensor-it/core';

export class BadRequestException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 400,
			message,
		});
	}
}
