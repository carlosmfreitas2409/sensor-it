import { Header } from '@/components/layout/header';

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex min-h-screen w-full flex-col bg-gray-50">
			<Header />

			<main className="flex-1">{children}</main>
		</div>
	);
}
