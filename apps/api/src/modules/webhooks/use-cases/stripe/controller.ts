import { Elysia, t } from 'elysia';

import { makeStripeWebhookUseCase } from './factory';

export const stripeWebhookController = new Elysia()
	.onParse(async ({ request, headers }) => {
		if (headers['content-type'] === 'application/json; charset=utf-8') {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const arrayBuffer = await Bun.readableStreamToArrayBuffer(request.body!);
			const rawBody = Buffer.from(arrayBuffer);
			return rawBody;
		}
	})
	.post(
		'/stripe',
		async ({ body, headers, set }) => {
			const useCase = makeStripeWebhookUseCase();

			const result = await useCase.execute({
				stripeSignature: headers['stripe-signature'],
				rawBody: body as Buffer,
			});

			set.status = 200;
			return result;
		},
		{
			body: t.Not(t.Undefined()),
			headers: t.Object({
				'stripe-signature': t.String(),
			}),
		},
	);
