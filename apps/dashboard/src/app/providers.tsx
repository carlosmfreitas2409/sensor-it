'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';

import { Toaster, TooltipProvider } from '@sensor-it/ui/components';

import { ModalProvider } from '@/components/modal-provider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider delayDuration={200}>
				<ModalProvider>
					{children}

					<Toaster richColors position="top-right" />
				</ModalProvider>
			</TooltipProvider>
		</QueryClientProvider>
	);
}
