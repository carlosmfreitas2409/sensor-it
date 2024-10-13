import { Background } from './components/background';

export default function OnboardingLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Background />
			{children}
		</>
	);
}
