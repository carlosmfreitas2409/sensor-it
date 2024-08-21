import { redirect } from 'next/navigation';

import { getProfile } from '@/services/session/get-profile';

import { getToken } from './token';

export function isAuthenticated() {
	return !!getToken();
}

export async function getUserViaToken() {
	const token = getToken();

	if (!token) {
		redirect('/auth/sign-in');
	}

	const { user } = await getProfile();

	return { user };
}
