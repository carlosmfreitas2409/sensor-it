import type { IUseCase } from '@sensor-it/core';

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
