import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex min-h-screen w-full bg-gray-50">
			<Sidebar />

			<div className="ml-72 flex flex-1 flex-col">
				<Header />

				<main className="flex flex-1 p-8">{children}</main>
			</div>
		</div>
	);
}
