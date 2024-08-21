import type { IUseCase } from '@/core/infra/use-case';

type AuthenticateWithPasswordInput = {
	email: string;
	password: string;
};

type AuthenticateWithPasswordOutput = {
	userId: string;
};

type IAuthenticateWithPasswordUseCase = IUseCase<
	AuthenticateWithPasswordInput,
	AuthenticateWithPasswordOutput
>;

export type {
	IAuthenticateWithPasswordUseCase,
	AuthenticateWithPasswordInput,
	AuthenticateWithPasswordOutput,
};
