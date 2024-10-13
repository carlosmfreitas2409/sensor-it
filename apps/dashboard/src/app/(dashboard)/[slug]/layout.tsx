export default function OrganizationLayout({
	children,
	dialog,
}: Readonly<{ children: React.ReactNode; dialog: React.ReactNode }>) {
	return (
		<>
			{children}
			{dialog}
		</>
	);
}
