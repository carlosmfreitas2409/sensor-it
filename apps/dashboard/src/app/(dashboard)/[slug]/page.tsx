import { Button, MaxWidthWrapper } from '@sensor-it/ui/components';
import { ChevronRight } from '@sensor-it/ui/icons';

import { getOrganizationSlug } from '@/lib/auth';

import { getOverview } from '@/services/metrics/get-overview';

import { FailureAverageCard } from './components/failure-average-card';
import { OperationCard } from './components/operation-card';
import { StatsCard } from './components/stats-card';

export default async function Dashboard() {
	const slug = getOrganizationSlug();

	if (!slug) {
		return null;
	}

	const { devices, activeDevices, failedMachines } = await getOverview(slug);

	return (
		<MaxWidthWrapper className="flex flex-1 flex-col gap-6">
			<div className="flex items-center justify-between gap-6">
				<h1 className="font-bold text-2xl">Painel de controle</h1>
			</div>

			<div className="grid grid-cols-3 gap-5">
				<StatsCard
					title="Total de dispositivos"
					value={devices.total}
					percentage={devices.percentageOverLastMonth}
				/>

				<StatsCard
					title="Dispositivos ativos"
					value={activeDevices.total}
					percentage={activeDevices.percentageOverLastMonth}
				/>

				<StatsCard
					title="Máquinas com falha"
					value={failedMachines.total}
					percentage={failedMachines.percentageOverLastMonth}
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
		</MaxWidthWrapper>
	);
}
