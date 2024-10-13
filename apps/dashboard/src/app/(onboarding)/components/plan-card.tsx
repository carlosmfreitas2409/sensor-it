import type { Plan } from '@sensor-it/utils/constants';

import { CheckCircle2 } from '@sensor-it/ui/icons';

import { Badge } from '@sensor-it/ui/components';

import { UpgradePlanButton } from '@/components/organizations/upgrade-plan-button';

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

			<div className="mt-4 flex flex-col gap-2">
				{plan.name.startsWith('Business') && (
					<span className="text-muted-foreground text-sm">
						Tudo no Pro, mais:
					</span>
				)}

				{plan.features.map((feature, index) => (
					<div
						key={index}
						className="flex items-center space-x-2 text-muted-foreground text-sm"
					>
						<CheckCircle2 className="size-6 fill-green-500 text-white" />
						<span>{feature}</span>
					</div>
				))}
			</div>

			<div className="mt-10 flex grow flex-col justify-end">
				<UpgradePlanButton plan={plan} period={period}>
					Começar com o {plan.name}
				</UpgradePlanButton>
			</div>
		</div>
	);
}
