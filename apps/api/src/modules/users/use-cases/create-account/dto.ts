import type { IUseCase } from '@/core/infra/use-case';

type CreateAccountInput = {
	name: string;
	email: string;
	password: string;
};

type ICreateAccountUseCase = IUseCase<CreateAccountInput, void>;

export type { CreateAccountInput, ICreateAccountUseCase };
