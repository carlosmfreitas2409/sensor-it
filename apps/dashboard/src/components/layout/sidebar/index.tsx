import { SuccessStatus } from '@sensor-it/ui/icons';

import { getOrganizationSlug } from '@/lib/auth';

import { NavItem } from './nav-item';
import { OrganizationSwitcher } from './organization-switcher';

export function Sidebar() {
	const slug = getOrganizationSlug();

	return (
		<aside className="fixed top-0 left-0 flex h-full w-72 flex-col border-r border-dashed bg-white">
			<div className="p-4">
				<OrganizationSwitcher />
			</div>

			<nav className="flex flex-col gap-1 px-4">
				<NavItem path={`/${slug}`} name="Painel de controle" icon="Home" />
				<NavItem path={`/${slug}/analytics`} name="Métricas" icon="AreaChart" />
				<NavItem path={`/${slug}/devices`} name="Dispositivos" icon="Cpu" />
			</nav>

			<div className="mt-auto space-y-4 px-4 pb-6">
				<div className="flex flex-col gap-1">
					<NavItem name="Suporte" path="/support" icon="LifeBuoy" />
					<NavItem name="Configurações" path="/settings" icon="Settings" />
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
