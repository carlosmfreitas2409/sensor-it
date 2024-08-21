import { cookies } from 'next/headers';

function getToken() {
	return cookies().get('token')?.value;
}

function saveToken(token: string) {
	cookies().set('token', token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});
}

function clearToken() {
	cookies().delete('token');
}

export { getToken, saveToken, clearToken };
