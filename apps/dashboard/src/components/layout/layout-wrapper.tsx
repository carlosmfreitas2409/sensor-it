'use client';

import { useOrganizationSlug } from '@/hooks/use-organization-slug';

import { Header } from './header';
import { Sidebar } from './sidebar';

export function LayoutWrapper({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const slug = useOrganizationSlug();

	if (!slug) {
		return (
			<div className="flex min-h-screen w-full flex-col bg-gray-50">
				<Header />

				<main className="h-[calc(100svh-64px)] w-full">{children}</main>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen w-full bg-gray-50">
			<Sidebar />

			<div className="ml-72 flex flex-1 flex-col">
				<Header />

				<main className="flex h-[calc(100%-64px)] w-full">{children}</main>
			</div>
		</div>
	);
}
