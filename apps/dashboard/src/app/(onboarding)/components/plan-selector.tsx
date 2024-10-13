import { BUSINESS_PLAN, PRO_PLAN } from '@sensor-it/utils/constants';

import { PlanCard } from './plan-card';

export function PlanSelector() {
	return (
		<div className="mt-8 grid gap-4 sm:grid-cols-2">
			<PlanCard name="Pro" period="monthly" plan={PRO_PLAN} />
			<PlanCard name="Business" period="monthly" plan={BUSINESS_PLAN} />
		</div>
	);
}
