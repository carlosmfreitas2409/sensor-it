'use client';

import { useDialog } from '@/components/dialogs/dialog-provider';

import { Button } from '@sensor-it/ui/components';

export function CreateOrganizationButton() {
	const { setShowCreateOrganizationDialog } = useDialog();

	return (
		<Button
			variant="secondary"
			onClick={() => setShowCreateOrganizationDialog(true)}
		>
			Criar organização
		</Button>
	);
}
