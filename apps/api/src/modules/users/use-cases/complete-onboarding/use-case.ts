import { NotFoundException } from '@/infra/http/errors';

import type { IUserRepository } from '../../repositories/interfaces/user-repository';

import type {
	CompleteOnboardingInput,
	ICompleteOnboardingUseCase,
} from './dto';

export class CompleteOnboardingUseCase implements ICompleteOnboardingUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({ userId }: CompleteOnboardingInput): Promise<boolean> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (user.onboardingCompleted) {
			return true;
		}

		await this.userRepository.setOnboardingCompleted(userId);

		return true;
	}
}
