import type { IUseCase } from '@sensor-it/core';

type StripeWebhookInput = {
	stripeSignature: string;
	rawBody: Buffer;
};

type StripeWebhookOutput = {
	ok: boolean;
	message?: string;
};

type IStripeWebhookUseCase = IUseCase<StripeWebhookInput, StripeWebhookOutput>;

export type { StripeWebhookInput, IStripeWebhookUseCase, StripeWebhookOutput };
