import { Button } from '@sensor-it/ui/components';
import { ChevronRight, Download, Filter } from '@sensor-it/ui/icons';

import { getOrganizationSlug } from '@/lib/auth';

import { getGeneralMetrics } from '@/services/metrics/get-general-metrics';

import { FailureAverageCard } from '@/components/dashboard/failure-average-card';
import { OperationCard } from '@/components/dashboard/operation-card';
import { StatsCard } from '@/components/dashboard/stats-card';

export default async function Dashboard() {
	const slug = getOrganizationSlug();

	if (!slug) {
		return null;
	}

	const metrics = await getGeneralMetrics(slug);

	return (
		<div className="flex flex-1 flex-col gap-6">
			<div className="flex items-center justify-between gap-6">
				<h1 className="font-bold text-2xl">Painel de controle</h1>
				<div className="space-x-3">
					<Button variant="outline">
						<Filter className="mr-2 size-4" />
						<span>Filtros</span>
					</Button>

					<Button>
						<Download className="mr-2 size-4" />
						<span>Exportar CSV</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-5">
				<StatsCard
					title="Total de dispositivos"
					value={metrics.devices.total}
					percentage={metrics.devices.percentageOverLastMonth}
				/>

				<StatsCard
					title="Dispositivos ativos"
					value={metrics.activeDevices.total}
					percentage={metrics.activeDevices.percentageOverLastMonth}
				/>

				<StatsCard
					title="Máquinas com falha"
					value={metrics.failedMachines.total}
					percentage={metrics.failedMachines.percentageOverLastMonth}
				/>
			</div>

			<OperationCard />

			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2">
					<FailureAverageCard />
				</div>

				<div className="flex h-full w-full flex-col items-start justify-between rounded-xl bg-gradient-to-tr from-purple-700 to-primary p-6 text-white">
					<div className="max-w-44 space-y-2">
						<p className="font-medium text-lg">Plano Pro</p>
						<p>
							Atualize agora para desbloquear todos os recursos que você
							precisa.
						</p>
					</div>

					<Button variant="outline" className="text-foreground">
						<ChevronRight className="mr-2 size-5" />
						<span>Desbloquear agora</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
