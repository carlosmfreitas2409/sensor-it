import type { IUseCase } from '@/core/infra/use-case';

type AuthenticateWithGoogleInput = {
	code: string;
};

type AuthenticateWithGoogleOutput = {
	userId: string;
};

type IAuthenticateWithGoogleUseCase = IUseCase<
	AuthenticateWithGoogleInput,
	AuthenticateWithGoogleOutput
>;

export type {
	IAuthenticateWithGoogleUseCase,
	AuthenticateWithGoogleInput,
	AuthenticateWithGoogleOutput,
};
