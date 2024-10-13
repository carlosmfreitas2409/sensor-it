'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/services/session/get-profile';

import { useOrganization } from '@/hooks/use-organization';

import { Bell } from '@sensor-it/ui/icons';

import { Button, Input, Skeleton } from '@sensor-it/ui/components';

import { UserDropdown } from './user-dropdown';

export function Header() {
	// const { user } = await getUserViaToken();

	const { slug } = useOrganization();

	const { data: profile, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getProfile,
	});

	return (
		<header className="h-16 w-full border-b">
			<div className="container flex h-full max-w-full items-center justify-between">
				<div className="flex flex-col">
					<span className="text-xs">Bem-vindo(a),</span>
					{isLoading ? (
						<Skeleton className="h-5 w-full" />
					) : (
						<span className="font-medium text-sm">{profile?.user.name}</span>
					)}
				</div>

				<Input
					type="search"
					className="hidden max-w-sm md:flex"
					placeholder="Pesquisar"
					autoComplete="off"
				/>

				<div className="flex items-center gap-4">
					<Button
						variant="link"
						className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text p-0 text-sm text-transparent"
						asChild
					>
						<Link href={`/${slug}/upgrade`}>Atualizar plano</Link>
					</Button>

					<Button variant="ghost" size="icon">
						<Bell className="size-5 text-muted-foreground" />
					</Button>

					{isLoading && <Skeleton className="h-10 w-10 rounded-full" />}

					{profile && <UserDropdown user={profile.user} />}
				</div>
			</div>
		</header>
	);
}
