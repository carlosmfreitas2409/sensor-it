import type { IUseCase } from '@sensor-it/core';

type CreateAccountInput = {
	name: string;
	email: string;
	password: string;
};

type ICreateAccountUseCase = IUseCase<CreateAccountInput, void>;

export type { CreateAccountInput, ICreateAccountUseCase };
