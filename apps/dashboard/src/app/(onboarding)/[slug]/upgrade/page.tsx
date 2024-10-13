import { PlanSelector } from '../../components/plan-selector';
import { StepPage } from '../../components/step-page';

import { CloseButton } from './close-button';

export default function Upgrade() {
	return (
		<div className="relative">
			<CloseButton />

			<StepPage
				title="Escolha seu plano"
				description="Encontre um plano que atenda às suas necessidades"
				className="max-w-2xl"
			>
				<PlanSelector />
			</StepPage>
		</div>
	);
}
