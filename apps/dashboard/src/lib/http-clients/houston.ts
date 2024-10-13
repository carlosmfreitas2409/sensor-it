import ky, { HTTPError } from 'ky';
import { getCookie, deleteCookie } from 'cookies-next';
import type { CookiesFn } from 'cookies-next/lib/types';

export const houstonApi = ky.create({
	prefixUrl: 'http://localhost:3332',
	retry: { limit: 3, methods: ['GET'], statusCodes: [401] },
	hooks: {
		beforeRequest: [
			(request) => {
				request.headers.set('Content-Type', 'application/json');
			},
			async (request) => {
				let cookieStore: CookiesFn | undefined;

				if (typeof window === 'undefined') {
					const { cookies: serverCookies } = await import('next/headers');
					cookieStore = serverCookies;
				}

				const token = getCookie('token', { cookies: cookieStore });

				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		beforeRetry: [
			async ({ error, retryCount }) => {
				if (
					error instanceof HTTPError &&
					error.response.status === 401 &&
					retryCount === 1
				) {
					let cookieStore: CookiesFn | undefined;

					if (typeof window === 'undefined') {
						const { cookies: serverCookies } = await import('next/headers');
						cookieStore = serverCookies;
					}

					deleteCookie('token', { cookies: cookieStore });
					deleteCookie('organization', { cookies: cookieStore });
				}
			},
		],
	},
});
