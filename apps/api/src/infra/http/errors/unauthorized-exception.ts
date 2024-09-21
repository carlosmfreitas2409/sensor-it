import { HttpException } from '@sensor-it/core';

export class UnauthorizedException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 401,
			message,
		});
	}
}
