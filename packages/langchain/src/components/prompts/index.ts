import { monitoringPrompt } from './monitoring';
import { supportPrompt } from './support';

type PromptType = 'support' | 'monitoring';

export function getPrompt(type: PromptType) {
	switch (type) {
		case 'monitoring':
			return monitoringPrompt;
		case 'support':
			return supportPrompt;
		default:
			return monitoringPrompt;
	}
}
