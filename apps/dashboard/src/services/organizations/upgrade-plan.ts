import { api } from '@/lib/http-clients/api';

type UpgradePlanRequest = {
	slug: string;
	body: {
		planKey: string;
		period: 'monthly' | 'yearly';
		cancelPath?: string;
	};
};

type UpgradePlanResponse = {
	sessionId?: string;
	url?: string;
};

export async function upgradePlan({ slug, body }: UpgradePlanRequest) {
	const response = await api
		.post(`organizations/${slug}/billing/upgrade`, {
			json: body,
		})
		.json<UpgradePlanResponse>();

	return response;
}
