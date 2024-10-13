import { redirect } from 'next/navigation';

import { getUserViaToken } from '@/lib/auth';

import { LayoutWrapper } from '@/components/layout/layout-wrapper';

export default async function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { user } = await getUserViaToken();

	if (!user.onboardingCompleted) {
		redirect('/onboarding');
	}

	return <LayoutWrapper>{children}</LayoutWrapper>;
}
