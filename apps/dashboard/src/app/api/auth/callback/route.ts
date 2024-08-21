import { type NextRequest, NextResponse } from 'next/server';

import { signInWithGoogle } from '@/services/session/sign-in-with-github';

import { saveToken } from '@/lib/auth/token';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;

	const code = searchParams.get('code');

	if (!code) {
		return NextResponse.json({ message: 'Invalid code' }, { status: 400 });
	}

	const { token } = await signInWithGoogle({ code });

	saveToken(token);

	const redirectUrl = request.nextUrl.clone();

	redirectUrl.pathname = '/';
	redirectUrl.search = '';

	return NextResponse.redirect(redirectUrl);
}
