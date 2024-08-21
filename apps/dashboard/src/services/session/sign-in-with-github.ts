import { api } from '@/lib/http-clients/api';

type SignInWithGoogleRequest = {
	code: string;
};

type SignInWithGoogleResponse = {
	token: string;
};

export async function signInWithGoogle({ code }: SignInWithGoogleRequest) {
	const response = await api
		.post('sessions/google', {
			json: { code },
		})
		.json<SignInWithGoogleResponse>();

	return response;
}
