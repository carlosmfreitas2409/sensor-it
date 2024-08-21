import type { User } from '@/entities/user';

import { api } from '@/lib/http-clients/api';

type GetProfileResponse = {
	user: User;
};

export async function getProfile() {
	const response = await api.get('sessions/profile').json<GetProfileResponse>();

	return response;
}
