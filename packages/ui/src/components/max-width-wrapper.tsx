import type { ReactNode } from 'react';

import { cn } from '@sensor-it/utils';

export function MaxWidthWrapper({
	verticalPadding = true,
	className,
	children,
}: {
	verticalPadding?: boolean;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div
			className={cn(
				'container mx-auto w-full',
				verticalPadding && 'py-6',
				className,
			)}
		>
			{children}
		</div>
	);
}
