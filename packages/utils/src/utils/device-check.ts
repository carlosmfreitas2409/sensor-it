const getUserAgent = () => navigator.userAgent.toLowerCase();

export function isMobile() {
	const userAgent = getUserAgent();

	return /iphone|ipad|ipod|android|blackberry|windows phone|opera mini/g.test(
		userAgent,
	);
}

export function isTablet() {
	const userAgent = getUserAgent();

	return /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
}

export function isDesktop() {
	return !isMobile() && !isTablet();
}
