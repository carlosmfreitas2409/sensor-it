import { api } from '@/lib/http-clients/api';

type SignUpRequest = {
	name: string;
	email: string;
	password: string;
};

export async function signUp({ name, email, password }: SignUpRequest) {
	const response = await api.post('users/sign-up', {
		json: {
			name,
			email,
			password,
		},
	});

	return response;
}
