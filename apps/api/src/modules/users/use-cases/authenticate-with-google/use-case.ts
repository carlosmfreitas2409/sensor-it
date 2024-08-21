import { z } from 'zod';
import { env } from '@sensor-it/env/server';

import type { IUserRepository } from '../../repositories/interfaces/user-repository';
import type { IAccountRepository } from '../../repositories/interfaces/account-repository';

import type {
	IAuthenticateWithGoogleUseCase,
	AuthenticateWithGoogleInput,
	AuthenticateWithGoogleOutput,
} from './dto';

export class AuthenticateWithGoogleUseCase
	implements IAuthenticateWithGoogleUseCase
{
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly accountRepository: IAccountRepository,
	) {}

	async execute({
		code,
	}: AuthenticateWithGoogleInput): Promise<AuthenticateWithGoogleOutput> {
		const googleOAuthURL = new URL('https://oauth2.googleapis.com/token');

		googleOAuthURL.searchParams.set('code', code);
		googleOAuthURL.searchParams.set('grant_type', 'authorization_code');
		googleOAuthURL.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID);
		googleOAuthURL.searchParams.set(
			'client_secret',
			env.GOOGLE_OAUTH_CLIENT_SECRET,
		);
		googleOAuthURL.searchParams.set(
			'redirect_uri',
			env.GOOGLE_OAUTH_REDIRECT_URI,
		);

		const googleAccessTokenResponse = await fetch(googleOAuthURL.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const googleAccessTokenData = await googleAccessTokenResponse.json();

		const { access_token: githubAccessToken } = z
			.object({
				access_token: z.string(),
				token_type: z.literal('Bearer'),
				scope: z.string(),
			})
			.parse(googleAccessTokenData);

		const googleUserResponse = await fetch(
			'https://www.googleapis.com/oauth2/v1/userinfo',
			{
				headers: {
					Authorization: `Bearer ${githubAccessToken}`,
				},
			},
		);

		const googleUserData = await googleUserResponse.json();

		const {
			id: googleId,
			name,
			email,
			picture: avatarUrl,
		} = z
			.object({
				id: z.string(),
				name: z.string(),
				email: z.string(),
				picture: z.string(),
			})
			.parse(googleUserData);

		let user = await this.userRepository.findByEmail(email);

		if (!user) {
			user = await this.userRepository.create({
				email,
				name,
				avatarUrl,
			});
		}

		const account = await this.accountRepository.findByUserIdAndProvider(
			user.id,
			'GOOGLE',
		);

		if (!account) {
			await this.accountRepository.create({
				userId: user.id,
				provider: 'GOOGLE',
				providerAccountId: googleId,
			});
		}

		return { userId: user.id };
	}
}
