'use client';

import type { User } from '@/entities/user';

import { signOut } from '@/lib/auth/actions';

import { DICEBEAR_AVATAR_URL } from '@sensor-it/utils/constants';

import { LogOut, Settings } from '@sensor-it/ui/icons';

import {
	Avatar,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Skeleton,
} from '@sensor-it/ui/components';

interface UserDropdownProps {
	user: User | null;
}

export function UserDropdown({ user }: UserDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="relative">
				{user ? (
					<Avatar>
						<AvatarImage
							src={user.avatarUrl || `${DICEBEAR_AVATAR_URL}${user.name}`}
						/>
					</Avatar>
				) : (
					<Skeleton className="size-10 rounded-full bg-red-500" />
				)}

				<div className="-bottom-0.5 -right-0.5 absolute h-4 w-4 rounded-full border-2 border-white bg-blue-500" />
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-full px-3 py-2 sm:w-56">
				<div className="p-2">
					<p className="truncate font-medium text-sm">{user?.name}</p>
					<p className="truncate text-muted-foreground text-sm">
						{user?.email}
					</p>
				</div>

				<DropdownMenuGroup className="space-y-0.5">
					<DropdownMenuItem className="cursor-pointer p-2">
						<Settings className="mr-2 size-4" />
						<span className="truncate">Configurações</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="cursor-pointer p-2"
						onClick={() => signOut()}
					>
						<LogOut className="mr-2 size-4" />
						<span className="truncate">Sair</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
