import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import '../styles/globals.css';

const dmSans = DM_Sans({ subsets: ['latin'] });

const baseUrl = 'https://sensor-it.vercel.app';

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: 'SensorIt | Monitor your machines smarter',
	description:
		'SensorIt is a platform enabling intelligent monitoring and analysis of industrial machines with real-time data and AI-powered insights.',
	openGraph: {
		title: 'SensorIt | Monitor your machines smarter',
		siteName: 'SensorIt',
		description:
			'SensorIt is a platform enabling intelligent monitoring and analysis of industrial machines with real-time data and AI-powered insights.',
		type: 'website',
		url: baseUrl,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={dmSans.className}>{children}</body>
		</html>
	);
}
