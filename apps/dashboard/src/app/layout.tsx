import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { Providers } from './providers';

import '@sensor-it/ui/globals.css';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | SensorIt',
		default: 'SensorIt',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={dmSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
