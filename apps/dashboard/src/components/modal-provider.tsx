import * as React from 'react';

import { useCreateOrganizationDialog } from './organizations/create-organization-dialog';

interface ModalContextProps {
	setShowCreateOrganizationDialog: (open: boolean) => void;
}

const ModalContext = React.createContext({} as ModalContextProps);

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const { AddOrganizationDialog, setShowCreateOrganizationDialog } =
		useCreateOrganizationDialog();

	return (
		<React.Suspense>
			<ModalContext.Provider value={{ setShowCreateOrganizationDialog }}>
				<AddOrganizationDialog />

				{children}
			</ModalContext.Provider>
		</React.Suspense>
	);
}

export function useModal() {
	const context = React.useContext(ModalContext);

	if (!context) {
		throw new Error('`useModal` must be used within a <ModalProvider />');
	}

	return context;
}
