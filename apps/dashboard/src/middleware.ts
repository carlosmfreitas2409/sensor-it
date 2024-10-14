import { type NextRequest, NextResponse } from 'next/server';

import { isAuthenticated } from './lib/auth';

const AUTH_PATHNAME = '/auth';
const PUBLIC_PATHNAMES = [
	'/organizations',
	'/settings',
	'/support',
	'/onboarding',
];

export function middleware(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;

	const authenticated = isAuthenticated();

	if (!authenticated && !pathname.startsWith(AUTH_PATHNAME)) {
		return NextResponse.redirect(new URL(`${AUTH_PATHNAME}/sign-in`, origin));
	}

	if (
		authenticated &&
		(pathname === '/' || pathname.startsWith(AUTH_PATHNAME))
	) {
		const lastUsedOrganization = request.cookies.get('organization')?.value;

		if (!lastUsedOrganization) {
			return NextResponse.redirect(new URL('/organizations', origin));
		}

		return NextResponse.redirect(new URL(lastUsedOrganization, origin));
	}

	const response = NextResponse.next();

	const [, slug] = pathname.split('/');

	console.log(slug, pathname);

	if (
		!pathname.startsWith(AUTH_PATHNAME) &&
		!PUBLIC_PATHNAMES.some((publicPath) => pathname.startsWith(publicPath)) &&
		slug
	) {
		response.cookies.set('organization', slug, {
			path: '/',
		});
	}

	if (PUBLIC_PATHNAMES.includes(pathname)) {
		response.cookies.delete('organization');
	}

	return response;
}

export const config = {
	matcher:
		'/((?!api|favicon.ico|_next/static|_next/image|static|.*\\..*|_next).*)',
};
