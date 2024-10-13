'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { completeOnboarding } from '@/services/users/complete-onboarding';

import { Button, type ButtonProps } from '@sensor-it/ui/components';

export function LaterButton(props: ButtonProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { mutateAsync } = useMutation({
		mutationFn: completeOnboarding,
	});

	async function finish() {
		await mutateAsync();

		const slug = searchParams.get('organization');

		router.push(slug ? `/${slug}` : '/');
	}

	return (
		<Button
			type="button"
			variant="link"
			className="mx-auto text-muted-foreground text-sm hover:no-underline enabled:hover:text-muted-foreground/85"
			onClick={finish}
			{...props}
		/>
	);
}
