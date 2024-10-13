import type { PropsWithChildren, ReactNode } from 'react';

import { cn } from '@sensor-it/utils';

import { SensorItWordMark, type LucideIcon } from '@sensor-it/ui/icons';

export interface StepPageProps extends PropsWithChildren {
	icon?: LucideIcon;
	title: ReactNode;
	description: ReactNode;
	className?: string;
}

export function StepPage({
	children,
	icon: Icon,
	title,
	description,
	className,
}: StepPageProps) {
	return (
		<div className="relative flex flex-col items-center">
			<SensorItWordMark className="mt-6 h-8" />

			<div className="mt-8 flex w-full flex-col items-center px-3 pb-16 md:mt-20 lg:px-8">
				<div
					className={cn(
						'mx-auto flex w-full max-w-sm flex-col items-center',
						className,
					)}
				>
					{Icon && (
						<div className="rounded-full border border-gray-200 bg-white p-2.5">
							<Icon className="size-[18px]" />
						</div>
					)}

					<h1 className="mt-4 text-center font-medium text-2xl leading-tight">
						{title}
					</h1>

					<p className="mt-1.5 text-center text-base text-gray-500 leading-tight">
						{description}
					</p>

					<div className="mt-8 w-full">{children}</div>
				</div>
			</div>
		</div>
	);
}
