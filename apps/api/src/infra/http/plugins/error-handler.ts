import type Elysia from 'elysia';

import { HttpException } from '@sensor-it/core';

export const errorHandler = (app: Elysia) =>
	app.error('HTTP_EXCEPTION', HttpException).onError(({ code, error, set }) => {
		switch (code) {
			case 'VALIDATION':
				set.status = error.status;
				return error.toResponse();
			case 'HTTP_EXCEPTION':
				set.status = error.statusCode;
				return error.toResponse();
			default:
				console.error(error);
				return new Response(null, { status: 500 });
		}
	});
