import { StepPage } from '../../components/step-page';
import { PlanSelector } from '../../components/plan-selector';

import { LaterButton } from './later-button';

export default function Plan() {
	return (
		<StepPage
			title="Escolha seu plano"
			description="Encontre um plano que atenda às suas necessidades"
			className="max-w-2xl"
		>
			<PlanSelector />

			<div className="mt-8 flex flex-col gap-3">
				<LaterButton>Vou fazer isso mais tarde</LaterButton>
			</div>
		</StepPage>
	);
}
