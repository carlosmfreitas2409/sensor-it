'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { DialogContent } from '@sensor-it/ui/components';

interface InterceptedDialogContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogContent> {}

const InterceptedDialogContent = React.forwardRef<
	React.ElementRef<typeof DialogContent>,
	InterceptedDialogContentProps
>((props, ref) => {
	const router = useRouter();

	function onDismiss() {
		router.back();
	}

	return (
		<DialogContent
			ref={ref}
			onEscapeKeyDown={onDismiss}
			onPointerDownOutside={onDismiss}
			{...props}
		/>
	);
});

InterceptedDialogContent.displayName = DialogContent.displayName;

export { InterceptedDialogContent };
