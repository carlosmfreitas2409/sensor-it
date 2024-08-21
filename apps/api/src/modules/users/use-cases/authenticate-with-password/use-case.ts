import { UnauthorizedException } from '@/infra/http/errors';

import type { IUserRepository } from '../../repositories/interfaces/user-repository';

import type {
	IAuthenticateWithPasswordUseCase,
	AuthenticateWithPasswordInput,
	AuthenticateWithPasswordOutput,
} from './dto';

export class AuthenticateWithPasswordUseCase
	implements IAuthenticateWithPasswordUseCase
{
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateWithPasswordInput): Promise<AuthenticateWithPasswordOutput> {
		const userFromEmail = await this.userRepository.findByEmail(email);

		if (!userFromEmail) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		if (userFromEmail.passwordHash === null) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const isPasswordValid = await Bun.password.verify(
			password,
			userFromEmail.passwordHash,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		return { userId: userFromEmail.id };
	}
}
