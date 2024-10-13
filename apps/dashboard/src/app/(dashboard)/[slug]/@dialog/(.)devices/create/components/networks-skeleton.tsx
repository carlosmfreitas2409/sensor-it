import { Skeleton } from '@sensor-it/ui/components';

export function NetworksSkeleton() {
	return (
		<>
			{Array.from({ length: 10 }, (_, index) => (
				<div
					key={index}
					className="flex h-10 items-center justify-between px-2"
				>
					<Skeleton className="h-6 w-32" />
					<div className="flex items-center gap-4">
						<Skeleton className="size-4" />
						<Skeleton className="size-4" />
					</div>
				</div>
			))}
		</>
	);
}
