import { Grid2x2Plus } from '@sensor-it/ui/icons';

import { StepPage } from '../../components/step-page';

import { Form } from './form';

export default function Organization() {
	return (
		<StepPage
			icon={Grid2x2Plus}
			title="Criar uma organização"
			description={
				<span className="underline transition-colors hover:text-gray-700">
					O que é uma organização?
				</span>
			}
		>
			<Form />
		</StepPage>
	);
}
