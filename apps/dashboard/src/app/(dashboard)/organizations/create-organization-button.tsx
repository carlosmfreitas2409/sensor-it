'use client';

import { useModal } from '@/components/modal-provider';

import { Button } from '@sensor-it/ui/components';

export function CreateOrganizationButton() {
	const { setShowCreateOrganizationDialog } = useModal();

	return (
		<Button
			variant="secondary"
			onClick={() => setShowCreateOrganizationDialog(true)}
		>
			Criar organização
		</Button>
	);
}
