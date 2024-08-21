export default function DevicesLayout({
	children,
	dialog,
}: Readonly<{
	children: React.ReactNode;
	dialog: React.ReactNode;
}>) {
	return (
		<>
			{children}
			{dialog}
		</>
	);
}
