import type { Plan } from '@sensor-it/utils/constants';

import { Badge } from '@sensor-it/ui/components';

import { UpgradePlanButton } from '@/components/organizations/upgrade-plan-button';
import { PlanFeatures } from '@/components/organizations/plan-features';

interface PlanCardProps {
	name: string;
	plan: Plan;
	period: 'monthly' | 'yearly';
}

export function PlanCard({ name, plan, period }: PlanCardProps) {
	const formattedPrice = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(plan.price[period]);

	return (
		<div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6">
			<div className="flex items-center gap-2">
				<h2 className="font-medium text-lg">{name}</h2>
				{name === 'Pro' && <Badge>Mais popular</Badge>}
			</div>

			<p className="mt-2 space-x-1 font-medium text-3xl">
				<span>{formattedPrice}</span>
				<span className="font-medium text-sm">
					por mês
					{period === 'yearly' && ', anualmente'}
				</span>
			</p>

			<PlanFeatures plan={plan.key} className="mt-4" />

			<div className="mt-10 flex grow flex-col justify-end">
				<UpgradePlanButton plan={plan} period={period}>
					Começar com o {plan.name}
				</UpgradePlanButton>
			</div>
		</div>
	);
}
