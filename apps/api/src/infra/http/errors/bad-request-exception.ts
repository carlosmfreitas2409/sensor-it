import { HttpException } from '@/core/exceptions/http-exception';

export class BadRequestException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 400,
			message,
		});
	}
}
