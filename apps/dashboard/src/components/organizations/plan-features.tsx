import { cn } from '@sensor-it/utils';

import { FREE_PLAN, PLANS } from '@sensor-it/utils/constants';

import { CheckCircle2 } from '@sensor-it/ui/icons';

interface PlanFeaturesProps {
	plan: string;
	className?: string;
}

export function PlanFeatures({ plan, className }: PlanFeaturesProps) {
	const selectedPlan = PLANS.find((p) => p.key === plan) ?? FREE_PLAN;

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			{selectedPlan.name.startsWith('Business') && (
				<span className="text-muted-foreground text-sm">
					Tudo no Pro, mais:
				</span>
			)}

			{selectedPlan.features.map((feature, index) => (
				<div
					key={index}
					className="flex items-center space-x-2 text-muted-foreground text-sm"
				>
					<CheckCircle2 className="size-6 fill-green-500 text-white" />
					<span>{feature}</span>
				</div>
			))}
		</div>
	);
}
