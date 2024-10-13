import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@sensor-it/utils';
import { PLANS } from '@sensor-it/utils/constants';

import { useOrganization } from '@/hooks/use-organization';

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
	Skeleton,
} from '@sensor-it/ui/components';

import { AvatarWithFallback } from '@/components/avatar-fallback';

import { useModal } from '@/components/modal-provider';

export function OrganizationSwitcher() {
	const currentOrganization = useOrganization();

	const { setShowCreateOrganizationDialog } = useModal();

	// const organizations = await listOrganizations();

	const { data: organizations } = useQuery({
		queryKey: ['organizations'],
		queryFn: listOrganizations,
		initialData: [],
	});

	const activePlan = PLANS.find(
		(plan) => plan.key === (currentOrganization?.plan || 'free'),
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
						src={currentOrganization?.avatarUrl}
						alt={currentOrganization?.name || ''}
					/>

					{!currentOrganization.isLoading ? (
						<div className="flex flex-col overflow-hidden text-left">
							<p className="truncate font-bold text-sm leading-5">
								{currentOrganization?.name}
							</p>
							<p className="truncate text-muted-foreground text-xs leading-4">
								Plano {activePlan?.name}
							</p>
						</div>
					) : (
						<div className="flex flex-col space-y-1">
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-4 w-24" />
						</div>
					)}
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
						const isSelected = currentOrganization?.slug === organization.slug;

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

				<DropdownMenuItem
					onClick={() => {
						setShowCreateOrganizationDialog(true);
					}}
				>
					<PlusCircle className="mr-2 size-5" />
					<span>Adiciona nova organização</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
