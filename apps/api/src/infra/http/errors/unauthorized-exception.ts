import { HttpException } from '@/core/exceptions/http-exception';

export class UnauthorizedException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 401,
			message,
		});
	}
}
