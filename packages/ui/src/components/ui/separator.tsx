import * as React from 'react';

import { cn } from '@sensor-it/utils';

interface SeparatorProps extends React.ComponentProps<'div'> {
	orientation?: 'horizontal' | 'vertical';
	decorative?: boolean;
}

const Separator = React.forwardRef<React.ElementRef<'div'>, SeparatorProps>(
	(
		{ className, orientation = 'horizontal', decorative = true, ...props },
		ref,
	) => {
		const ariaOrientation =
			orientation === 'vertical' ? orientation : undefined;

		const semanticProps = decorative
			? { role: 'none' }
			: { 'aria-orientation': ariaOrientation, role: 'separator' };

		return (
			<div
				ref={ref}
				data-orientation={orientation}
				className={cn(
					'shrink-0 bg-border',
					orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
					className,
				)}
				{...semanticProps}
				{...props}
			/>
		);
	},
);

Separator.displayName = 'Separator';

export { Separator };
