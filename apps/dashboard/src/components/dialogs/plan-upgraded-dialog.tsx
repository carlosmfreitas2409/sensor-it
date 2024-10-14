import { useCallback, useMemo, useState } from 'react';

import { PLANS, PRO_PLAN } from '@sensor-it/utils/constants';

import { useRouterStuff } from '@sensor-it/ui/hooks';

import { Button, Dialog, DialogContent } from '@sensor-it/ui/components';

import { PlanFeatures } from '../organizations/plan-features';

interface PlanUpgradedDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function PlanUpgradedDialog({
	open,
	onOpenChange,
}: PlanUpgradedDialogProps) {
	const { searchParams, queryParams } = useRouterStuff();

	const planId = searchParams.get('plan');

	const plan = PLANS.find((p) => p.key === planId) ?? PRO_PLAN;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md gap-0 overflow-hidden p-0">
				<div className="px-6 py-8 sm:px-12">
					<h1 className="font-medium text-lg">
						SensorIt {plan.name} fica bem em você!
					</h1>

					<p className="mt-2 text-muted-foreground text-sm">
						Obrigado por atualizar para o plano {plan.name}! Agora você tem
						acesso a recursos mais poderosos e limites mais altos.
					</p>

					<h2 className="mt-6 mb-2 font-medium text-base text-gray-950">
						Explore os benefícios do seu plano {plan.name}
					</h2>

					<PlanFeatures plan={plan.key} />

					<Button
						type="button"
						className="mt-8 w-full"
						onClick={() =>
							queryParams({
								del: ['upgraded', 'plan'],
							})
						}
					>
						Começar agora
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function usePlanUpgradedDialog() {
	const [showPlanUpgradedDialog, setShowPlanUpgradedDialog] = useState(false);

	const PlanUpgradedDialogCallback = useCallback(() => {
		return (
			<PlanUpgradedDialog
				open={showPlanUpgradedDialog}
				onOpenChange={setShowPlanUpgradedDialog}
			/>
		);
	}, [showPlanUpgradedDialog]);

	return useMemo(
		() => ({
			setShowPlanUpgradedDialog,
			PlanUpgradedDialog: PlanUpgradedDialogCallback,
		}),
		[PlanUpgradedDialogCallback],
	);
}
