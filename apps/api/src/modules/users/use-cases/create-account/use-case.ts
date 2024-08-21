import { BadRequestException } from '@/infra/http/errors';

import type { IUnitOfWork } from '@/infra/providers/unit-of-work/model';

import type { IOrganizationRepository } from '@/modules/organizations/repositories/interfaces/organization-repository';
import type { IMemberRepository } from '@/modules/members/repositories/interfaces/member-repository';

import type { IUserRepository } from '../../repositories/interfaces/user-repository';

import type { ICreateAccountUseCase, CreateAccountInput } from './dto';

export class CreateAccountUseCase implements ICreateAccountUseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly organizationRepository: IOrganizationRepository,
		private readonly memberRepository: IMemberRepository,
		private readonly unitOfWork: IUnitOfWork,
	) {}

	async execute({ name, email, password }: CreateAccountInput): Promise<void> {
		const userWithSameEmail = await this.userRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new BadRequestException('User with same email already exists.');
		}

		const [, domain] = email.split('@');

		const autoJoinOrganization =
			await this.organizationRepository.findByDomainAndAttachAllowed(domain);

		const passwordHash = await Bun.password.hash(password);

		await this.unitOfWork.runInTransaction(async () => {
			const user = await this.userRepository.create({
				name,
				email,
				passwordHash,
			});

			if (!autoJoinOrganization) return;

			await this.memberRepository.create({
				userId: user.id,
				organizationId: autoJoinOrganization.id,
			});
		});

		return;
	}
}
