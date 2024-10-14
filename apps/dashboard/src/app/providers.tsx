'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';

import { Toaster, TooltipProvider } from '@sensor-it/ui/components';

import { DialogProvider } from '@/components/dialogs/dialog-provider';
import { Suspense } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider delayDuration={200}>
				<Suspense>
					<DialogProvider>
						{children}

						<Toaster richColors position="top-right" />
					</DialogProvider>
				</Suspense>
			</TooltipProvider>
		</QueryClientProvider>
	);
}
