import { slugify } from '@sensor-it/utils';

import { ConflictException } from '@/infra/http/errors';

import type { IUnitOfWork } from '@/infra/providers/unit-of-work/model';

import type { IMemberRepository } from '@/modules/members/repositories/interfaces/member-repository';

import type { IOrganizationRepository } from '../../repositories/interfaces/organization-repository';

import type {
	ICreateOrganizationUseCase,
	CreateOrganizationInput,
} from './dto';

export class CreateOrganizationUseCase implements ICreateOrganizationUseCase {
	constructor(
		private readonly organizationRepository: IOrganizationRepository,
		private readonly memberRepository: IMemberRepository,
		private readonly unitOfWork: IUnitOfWork,
	) {}

	async execute({
		userId,
		name,
		slug,
		domain,
		shouldAttachUsersByDomain,
	}: CreateOrganizationInput): Promise<string> {
		if (domain) {
			const existingOrganization =
				await this.organizationRepository.findByDomain(domain);

			if (existingOrganization) {
				throw new ConflictException(
					'Another organization already uses this domain.',
				);
			}
		}

		const organizationId = await this.unitOfWork.runInTransaction(async () => {
			const organization = await this.organizationRepository.create({
				name,
				slug: slug || slugify(name),
				domain,
				shouldAttachUsersByDomain,
				ownerId: userId,
				plan: 'free',
			});

			await this.memberRepository.create({
				userId,
				organizationId: organization.id,
				role: 'ADMIN',
			});

			return organization.id;
		});

		return organizationId;
	}
}
