import { api } from '@/lib/http-clients/api';

export async function completeOnboarding() {
	const response = await api.patch('users/onboarding/complete');

	return response;
}
