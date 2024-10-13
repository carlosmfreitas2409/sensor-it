import { GetOverviewUseCase } from './use-case';

export function makeGetOverviewUseCase() {
	const useCase = new GetOverviewUseCase();

	return useCase;
}
