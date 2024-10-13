import { Elysia } from 'elysia';

import { auth } from '@/infra/http/plugins/auth';

import { makeCompleteOnboardingUseCase } from './factory';

export const completeOnboardingController = new Elysia()
	.use(auth)
	.patch('/onboarding/complete', async ({ set, getCurrentUserId }) => {
		const userId = await getCurrentUserId();

		const useCase = makeCompleteOnboardingUseCase();

		await useCase.execute({
			userId,
		});

		set.status = 204;
	});
