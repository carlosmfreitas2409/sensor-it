import { useCallback, useMemo, useState } from 'react';

import { SensorItMark } from '@sensor-it/ui/icons';

import { Dialog, DialogContent } from '@sensor-it/ui/components';

import { CreateOrganizationForm } from '../organizations/create-organization-form';

interface CreateOrganizationDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function CreateOrganizationDialog({
	open,
	onOpenChange,
}: CreateOrganizationDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md gap-0 overflow-hidden p-0">
				<div className="flex flex-col items-center justify-center space-y-2 border-b px-4 pt-8 pb-6 sm:px-16">
					<SensorItMark className="size-10" />
					<h3 className="font-medium text-lg">Criar nova organização</h3>
					<span className="text-center text-muted-foreground text-xs underline underline-offset-4 hover:text-gray-700">
						O que é uma organização?
					</span>
				</div>

				<div className="bg-accent px-4 pt-6 pb-8 sm:px-16">
					<CreateOrganizationForm />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function useCreateOrganizationDialog() {
	const [showCreateOrganizationDialog, setShowCreateOrganizationDialog] =
		useState(false);

	const CreateOrganizationDialogCallback = useCallback(() => {
		return (
			<CreateOrganizationDialog
				open={showCreateOrganizationDialog}
				onOpenChange={setShowCreateOrganizationDialog}
			/>
		);
	}, [showCreateOrganizationDialog]);

	return useMemo(
		() => ({
			setShowCreateOrganizationDialog,
			CreateOrganizationDialog: CreateOrganizationDialogCallback,
		}),
		[CreateOrganizationDialogCallback],
	);
}
