'use client';

import { useRouter } from 'next/navigation';

import { CreateOrganizationForm } from '@/components/organizations/create-organization-form';

export function Form() {
	const router = useRouter();

	return (
		<CreateOrganizationForm
			onSuccess={({ slug }) => {
				router.push(`/onboarding/plan?organization=${slug}`);
			}}
		/>
	);
}
