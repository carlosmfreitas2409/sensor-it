import type { IUseCase } from '@sensor-it/core';

type CreateOrganizationInput = {
	userId: string;
	name: string;
	slug?: string;
	domain?: string;
	shouldAttachUsersByDomain?: boolean;
};

type ICreateOrganizationUseCase = IUseCase<CreateOrganizationInput, string>;

export type { ICreateOrganizationUseCase, CreateOrganizationInput };
