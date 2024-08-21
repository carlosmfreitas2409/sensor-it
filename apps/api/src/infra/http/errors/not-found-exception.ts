import { HttpException } from '@/core/exceptions/http-exception';

export class NotFoundException extends HttpException {
	constructor(message: string) {
		super({
			statusCode: 404,
			message,
		});
	}
}
