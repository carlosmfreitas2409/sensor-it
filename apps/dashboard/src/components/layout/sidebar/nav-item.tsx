'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@sensor-it/utils';

import * as icons from '@sensor-it/ui/icons';

interface NavItemProps {
	name: string;
	path: string;
	icon: keyof typeof icons;
}

export function NavItem({ name, path, icon }: NavItemProps) {
	const pathname = usePathname();
	const { slug } = useParams();

	const isActive =
		pathname === path || (pathname.startsWith(path) && path !== `/${slug}`);

	const Icon = icons[icon] as icons.LucideIcon;

	return (
		<Link
			href={path}
			data-active={isActive}
			className={cn(
				'flex flex-1 items-center justify-center rounded-lg py-2.5 pr-2 pl-3 text-muted-foreground transition-colors hover:bg-primary/5',
				isActive && 'bg-primary/10 text-primary',
			)}
		>
			<Icon className="mr-3 size-6" />
			<span className="flex-1 font-medium text-sm leading-5">{name}</span>
		</Link>
	);
}
