import type { IUseCase } from '@sensor-it/core';

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
