import { Skeleton } from '@sensor-it/ui/components';

export function SkeletonHeader() {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Skeleton className="h-7 w-40" />
					<Skeleton className="ml-4 h-5 w-12" />
				</div>

				<Skeleton className="h-10 w-36" />
			</div>

			<div className="mt-2 flex gap-4">
				<Skeleton className="size-16 rounded-md" />

				<div className="flex flex-col justify-between">
					<Skeleton className="h-5 w-36" />
					<Skeleton className="h-5 w-36" />
					<Skeleton className="h-5 w-36" />
				</div>
			</div>
		</div>
	);
}
