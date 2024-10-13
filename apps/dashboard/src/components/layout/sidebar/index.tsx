'use client';

import { Bot, Cpu, Home, LifeBuoy, SuccessStatus } from '@sensor-it/ui/icons';

import { useOrganization } from '@/hooks/use-organization';

import { OrganizationSwitcher } from './organization-switcher';
import { NavItem } from './nav-item';

export function Sidebar() {
	const { slug } = useOrganization();

	return (
		<aside className="fixed top-0 left-0 flex h-full w-72 flex-col border-r border-dashed bg-white">
			<div className="p-4">
				<OrganizationSwitcher />
			</div>

			<nav className="flex flex-col gap-1 px-4">
				<NavItem name="Painel de controle" path={`/${slug}`} icon={Home} />
				<NavItem name="Dispositivos" path={`/${slug}/devices`} icon={Cpu} />
				<NavItem name="Chat" path={`/${slug}/chat`} icon={Bot} />
			</nav>

			<div className="mt-auto space-y-4 px-4 pb-6">
				<div className="flex flex-col gap-1">
					<NavItem name="Suporte" path="mailto:hi@sensor.it" icon={LifeBuoy} />
				</div>

				<div className="flex gap-4 rounded-2xl bg-gray-50 px-4 py-5">
					<div className="flex flex-1 flex-col gap-1">
						<span className="font-bold text-sm leading-5">
							Máquinas operando!
						</span>
						<p className="text-muted-foreground text-xs leading-4">
							Todas máquinas operando a todo vapor e sem irregularidades.
						</p>
					</div>

					<SuccessStatus />
				</div>
			</div>
		</aside>
	);
}
