import { NotFoundException } from '@/infra/http/errors/not-found-exception';

import type { IUserRepository } from '../../repositories/interfaces/user-repository';

import type {
	IGetProfileUseCase,
	GetProfileInput,
	GetProfileOutput,
} from './dto';

export class GetProfileUseCase implements IGetProfileUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({ userId }: GetProfileInput): Promise<GetProfileOutput> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return { user };
	}
}
