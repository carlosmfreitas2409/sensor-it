import { HttpException } from '@sensor-it/core';

export class ConflictException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 409,
			message,
		});
	}
}
