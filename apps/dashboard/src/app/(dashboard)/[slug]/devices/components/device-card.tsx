import type { Device } from '@/entities/device';

import { getOrganizationSlug } from '@/lib/auth';

import { ChartColumn } from '@sensor-it/ui/icons';

import {
	Card,
	CardHeader,
	Badge,
	CardContent,
	Separator,
	Button,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@sensor-it/ui/components';

import { AvatarWithFallback } from '@/components/avatar-fallback';

import { statuses } from '../mock';

import { ActionsDropdownMenu } from './actions-dropdown-menu';
import Link from 'next/link';

interface DeviceCardProps {
	device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
	const slug = getOrganizationSlug();

	return (
		<Card>
			<CardHeader className="relative flex items-center justify-center">
				<Badge
					className="absolute top-6 left-6"
					variant={statuses[device.status].variant}
				>
					{statuses[device.status].label}
				</Badge>

				<img src={device.image} alt={device.model} className="size-36" />
			</CardHeader>

			<CardContent>
				<div className="flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<span className="font-bold">{device.name}</span>
						<span className="text-muted-foreground text-sm">
							{device.model}
						</span>
					</div>

					<div className="flex items-center">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="size-8" asChild>
									<Link href={`/${slug}/devices/${device.id}`}>
										<ChartColumn className="size-4" />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<span>Ver histórico</span>
							</TooltipContent>
						</Tooltip>

						<ActionsDropdownMenu deviceId={device.id} />
					</div>
				</div>

				<Separator className="my-4" />

				<div className="flex items-center justify-between">
					<span className="font-medium text-sm">{device.machine}</span>

					<AvatarWithFallback
						className="size-6"
						src={device.assignee.avatarUrl}
						alt={device.assignee.name}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
