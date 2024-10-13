'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import type { Plan } from '@sensor-it/utils/constants';

import { getStripe } from '@/lib/stripe';

import { upgradePlan } from '@/services/organizations/upgrade-plan';

import { useOrganization } from '@/hooks/use-organization';

import { Button, type ButtonProps } from '@sensor-it/ui/components';

interface UpgradePlanButtonProps extends ButtonProps {
	plan: Plan;
	period: 'monthly' | 'yearly';
}

export function UpgradePlanButton({
	plan,
	period,
	children,
	...props
}: UpgradePlanButtonProps) {
	const { slug, plan: currentPlan } = useOrganization();

	const router = useRouter();

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isActivePlan = currentPlan === plan.key;

	const { mutateAsync, isPending } = useMutation({
		mutationFn: upgradePlan,
	});

	async function handleUpgrade() {
		if (!slug) return;

		const queryString = searchParams.toString();

		const response = await mutateAsync({
			slug,
			body: {
				planKey: `${plan.key}_${period}`,
				period,
				cancelPath: `${pathname}${queryString.length ? `?${queryString}` : ''}`,
			},
		});

		if (response.sessionId) {
			const stripe = await getStripe();
			stripe?.redirectToCheckout({ sessionId: response.sessionId });
			return;
		}

		if (response.url) {
			router.push(response.url);
			return;
		}
	}

	return (
		<Button
			type="button"
			variant="secondary"
			disabled={!slug || isActivePlan}
			onClick={handleUpgrade}
			isLoading={isPending}
			{...props}
		>
			{isActivePlan
				? 'Já possui assinatura'
				: children || `Atualizar para ${plan.name}`}
		</Button>
	);
}
