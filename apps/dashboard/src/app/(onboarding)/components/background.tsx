'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { cn } from '@sensor-it/utils';

export function Background() {
	const pathname = usePathname();

	const [isGridLoaded, setIsGridLoaded] = useState(false);
	const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

	const isLoaded = isGridLoaded && isBackgroundLoaded;

	const isWelcome = pathname === '/onboarding/welcome';

	return (
		<div
			className={cn(
				'absolute inset-0 overflow-hidden bg-white transition-opacity duration-300',
				isWelcome ? (isLoaded ? 'opacity-100' : 'opacity-0') : 'opacity-40',
			)}
		>
			<BackgroundGradient className="opacity-15" />

			<div className="-translate-x-1/2 absolute top-0 bottom-0 left-1/2 opacity-50 transition-all sm:opacity-100">
				<Image
					src="/assets/background-grid.svg"
					onLoad={() => setIsGridLoaded(true)}
					alt=""
					width={1750}
					height={1046}
					className="absolute inset-0 h-full object-cover"
				/>

				<Image
					src="/assets/background.svg"
					onLoad={() => setIsBackgroundLoaded(true)}
					alt=""
					width={1750}
					height={1046}
					className={cn(
						'relative h-full min-w-[1000px] max-w-screen-2xl object-cover transition-opacity duration-300',
						isWelcome ? 'opacity-100' : 'opacity-0',
					)}
				/>
			</div>

			<BackgroundGradient className="opacity-100 mix-blend-soft-light" />
		</div>
	);
}

function BackgroundGradient({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'absolute top-0 left-0 aspect-square w-full overflow-hidden sm:aspect-[2/1]',
				'[mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)]',
				className,
			)}
		>
			<div
				className="absolute inset-0 saturate-150"
				style={{
					backgroundImage:
						'conic-gradient(from -45deg at 50% -10%, #3A8BFD 0deg, #FF0000 172.98deg, #855AFC 215.14deg, #FF7B00 257.32deg, #3A8BFD 360deg)',
				}}
			/>
			<div className="absolute inset-0 backdrop-blur-[100px]" />
		</div>
	);
}
