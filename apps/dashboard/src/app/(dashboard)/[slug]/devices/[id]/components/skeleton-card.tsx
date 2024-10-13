import { cn } from '@sensor-it/utils';

import { Skeleton } from '@sensor-it/ui/components';

export function SkeletonCard({ className }: { className?: string }) {
	return <Skeleton className={cn('h-56', className)} />;
}
