import Link from 'next/link';

import { listOrganizations } from '@/services/organizations/list-organizations';

import { Cpu } from '@sensor-it/ui/icons';

import { Badge, Card } from '@sensor-it/ui/components';

import { AvatarWithFallback } from '@/components/avatar-fallback';

import { CreateOrganizationButton } from './create-organization-button';

export default async function Organizations() {
	const organizations = await listOrganizations();

	return (
		<div className="w-full">
			<div className="flex h-36 border-b">
				<div className="container flex flex-1 items-center justify-between gap-4">
					<h1 className="truncate font-medium text-2xl">Minhas organizações</h1>
					<CreateOrganizationButton />
				</div>
			</div>

			<div className="container">
				<div className="my-10 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
					{organizations.map((organization) => (
						<Card
							key={organization.slug}
							className="space-y-6 p-6 transition-shadow hover:shadow-md"
							asChild
						>
							<Link href={`/${organization.slug}`}>
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<AvatarWithFallback
											className="size-10 rounded-full"
											src={organization.avatarUrl}
											alt={organization.name}
										/>

										<div>
											<h2 className="truncate font-medium text-lg">
												{organization.name}
											</h2>
											<p className="text-muted-foreground text-sm">
												{organization.slug}
											</p>
										</div>
									</div>

									<Badge variant="secondary">Gratuito</Badge>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex items-center space-x-1 text-muted-foreground text-sm">
										<Cpu className="size-4" />
										<span>{organization.devices} dispositivos</span>
									</div>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
