import { api } from '@/lib/http-clients/api';

type SignInWithPasswordRequest = {
	email: string;
	password: string;
};

type SignInWithPasswordResponse = {
	token: string;
};

export async function signInWithPassword({
	email,
	password,
}: SignInWithPasswordRequest) {
	const response = await api
		.post('sessions/password', {
			json: {
				email,
				password,
			},
		})
		.json<SignInWithPasswordResponse>();

	return response;
}
