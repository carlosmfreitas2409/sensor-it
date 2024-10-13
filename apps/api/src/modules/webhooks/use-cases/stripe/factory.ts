import { StripeWebhookUseCase } from './use-case';

export function makeStripeWebhookUseCase() {
	const useCase = new StripeWebhookUseCase();

	return useCase;
}
