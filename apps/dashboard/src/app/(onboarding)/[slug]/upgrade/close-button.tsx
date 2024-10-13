'use client';

import { useRouter } from 'next/navigation';
import { useHotkeys } from 'react-hotkeys-hook';

import { X } from '@sensor-it/ui/icons';

import { Button } from '@sensor-it/ui/components';

export function CloseButton() {
	const router = useRouter();

	function onExit() {
		router.back();
	}

	useHotkeys('Escape', onExit);

	return (
		<Button
			type="button"
			variant="link"
			size="icon"
			className="absolute top-2 right-2 z-10 text-foreground hover:scale-125"
			onClick={onExit}
		>
			<X className="size-5" />
		</Button>
	);
}
