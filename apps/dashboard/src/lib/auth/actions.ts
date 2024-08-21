'use server';

import { redirect } from 'next/navigation';
import { env } from '@sensor-it/env/client';

import { signInWithPassword } from '@/services/session/sign-in-with-password';

import { clearToken, saveToken } from './token';
import { clearOrganization } from './organization';

type Provider = 'credentials' | 'google';

type CredentialsOptions = { email: string; password: string };

type SignInOptions<P extends Provider> = P extends 'credentials'
	? CredentialsOptions
	: never;

export async function signIn<P extends Provider>(
	provider: P,
	options?: SignInOptions<P>,
) {
	const providerFn = {
		google: signInWithGoogle,
		credentials: signInWithCredentials,
	}[provider];

	return providerFn(options as SignInOptions<P>);
}

async function signInWithCredentials({ email, password }: CredentialsOptions) {
	const { token } = await signInWithPassword({
		email,
		password,
	});

	saveToken(token);

	redirect('/');
}

function signInWithGoogle() {
	const googleSignInUrl = new URL(
		'o/oauth2/v2/auth',
		'https://accounts.google.com',
	);

	googleSignInUrl.searchParams.append('client_id', env.GOOGLE_OAUTH_CLIENT_ID);
	googleSignInUrl.searchParams.append(
		'redirect_uri',
		env.GOOGLE_OAUTH_REDIRECT_URI,
	);
	googleSignInUrl.searchParams.append('response_type', 'code');
	googleSignInUrl.searchParams.append(
		'scope',
		[
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
	);

	redirect(googleSignInUrl.toString());
}

export async function signOut(options?: { redirectUrl?: string }) {
	const { redirectUrl = '/' } = options || {};

	clearToken();
	clearOrganization();

	redirect(redirectUrl);
}
