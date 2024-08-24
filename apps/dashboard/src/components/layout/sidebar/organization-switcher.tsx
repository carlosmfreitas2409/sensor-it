import Link from 'next/link';
import { cn } from '@sensor-it/utils';

import { getOrganizationSlug } from '@/lib/auth';

import { listOrganizations } from '@/services/organizations/list-organizations';

import { Check, ChevronsUpDown, PlusCircle } from '@sensor-it/ui/icons';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@sensor-it/ui/components';

import { AvatarWithFallback } from '@/components/avatar-fallback';

export async function OrganizationSwitcher() {
	const slug = getOrganizationSlug();

	const organizations = await listOrganizations();

	const selectedOrganization = organizations.find(
		(organization) => organization.slug === slug,
	);

	// if (!selectedOrganization) {
	// 	redirect('/organizations');
	// }

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex h-16 w-full items-center justify-between gap-2 rounded-xl border p-3">
				<div className="flex flex-1 items-center gap-3 overflow-hidden">
					<AvatarWithFallback
						className="rounded-xl"
						src={selectedOrganization?.avatarUrl}
						alt={selectedOrganization?.name || ''}
					/>

					<div className="flex flex-col overflow-hidden text-left">
						<p className="truncate font-bold text-sm leading-5">
							{selectedOrganization?.name}
						</p>
						<p className="truncate text-muted-foreground text-xs leading-4">
							Plano básico
						</p>
					</div>
				</div>

				<ChevronsUpDown className="size-4" />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				sideOffset={8}
				className="w-[255px] px-2 py-3"
			>
				<div className="flex items-center justify-between px-2 pb-2">
					<DropdownMenuLabel className="p-0 font-normal text-muted-foreground text-xs">
						Minhas organizações
					</DropdownMenuLabel>

					<Button
						variant="outline"
						size="sm"
						className="h-7 px-2 text-xs"
						asChild
					>
						<Link href="/organizations">Ver todas</Link>
					</Button>
				</div>

				<DropdownMenuGroup className="space-y-1">
					{organizations.map((organization) => {
						const isSelected = selectedOrganization?.slug === organization.slug;

						return (
							<DropdownMenuItem
								key={organization.slug}
								className="space-x-2"
								asChild
							>
								<Link href={`/${organization.slug}`}>
									<AvatarWithFallback
										className="size-7"
										src={organization.avatarUrl}
										alt={organization.name}
									/>

									<span
										className={cn(
											'block flex-1 truncate text-sm',
											isSelected && 'font-medium',
										)}
									>
										{organization.name}
									</span>

									{isSelected && <Check className="size-5" aria-hidden />}
								</Link>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuGroup>

				<DropdownMenuSeparator className="my-2" />

				<DropdownMenuItem>
					<PlusCircle className="mr-2 size-5" />
					<span>Adiciona nova organização</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
