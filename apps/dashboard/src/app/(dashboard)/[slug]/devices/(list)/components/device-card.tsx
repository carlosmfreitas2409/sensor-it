import type { Device } from '@/entities/device';

import { DICEBEAR_AVATAR_URL } from '@sensor-it/utils/constants';

import {
	Card,
	CardHeader,
	Badge,
	CardContent,
	Separator,
	Avatar,
	AvatarImage,
} from '@sensor-it/ui/components';

import { statuses } from '../mock';

import { ActionsDropdownMenu } from './actions-dropdown-menu';

interface DeviceCardProps {
	device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
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

					<ActionsDropdownMenu />
				</div>

				<Separator className="my-4" />

				<div className="flex items-center justify-between">
					<span className="font-medium text-sm">{device.machine}</span>

					<Avatar className="size-6">
						<AvatarImage
							src={`${DICEBEAR_AVATAR_URL}${device.assignee.name}`}
						/>
					</Avatar>
				</div>
			</CardContent>
		</Card>
	);
}
