import * as React from 'react';
import { useSearchParams } from 'next/navigation';

import { useCreateOrganizationDialog } from './create-organization-dialog';
import { usePlanUpgradedDialog } from './plan-upgraded-dialog';

interface DialogContextProps {
	setShowCreateOrganizationDialog: (open: boolean) => void;
}

const DialogContext = React.createContext({} as DialogContextProps);

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();

	const { CreateOrganizationDialog, setShowCreateOrganizationDialog } =
		useCreateOrganizationDialog();

	const { PlanUpgradedDialog, setShowPlanUpgradedDialog } =
		usePlanUpgradedDialog();

	React.useEffect(() => {
		setShowPlanUpgradedDialog(
			searchParams.has('upgraded') && searchParams.has('plan'),
		);
	}, [searchParams, setShowPlanUpgradedDialog]);

	return (
		<React.Suspense>
			<DialogContext.Provider value={{ setShowCreateOrganizationDialog }}>
				<CreateOrganizationDialog />
				<PlanUpgradedDialog />

				{children}
			</DialogContext.Provider>
		</React.Suspense>
	);
}

export function useDialog() {
	const context = React.useContext(DialogContext);

	if (!context) {
		throw new Error('`useDialog` must be used within a <DialogProvider />');
	}

	return context;
}
