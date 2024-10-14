'use client';

import { usePDF } from 'react-to-pdf';
import { useQuery } from '@tanstack/react-query';

import { getDevice } from '@/services/devices/get-device';

import { Download } from '@sensor-it/ui/icons';

import { Button, MaxWidthWrapper } from '@sensor-it/ui/components';

import { PowerCard } from './components/charts/power-card';
import { ElectricCurrentCard } from './components/charts/electric-current-card';
import { PowerFactorCard } from './components/charts/power-factor-card';
import { TemperatureCard } from './components/charts/temperature-card';
import { VibrationCard } from './components/charts/vibration-card';
import { SkeletonHeader } from './components/skeleton-header';
import { Filters } from './components/filters';

import { AnalyticsProvider } from './components/analytics-provider';

import { statuses } from '../mock';

interface DevicePageProps {
	params: {
		slug: string;
		id: string;
	};
}

export default function DevicePage({ params }: DevicePageProps) {
	const { data: device, isLoading } = useQuery({
		queryKey: ['device', params.id],
		queryFn: () => getDevice(params.slug, params.id),
	});

	const { targetRef, toPDF } = usePDF({
		filename: `Relatório de ${device?.name}`,
	});

	return (
		<AnalyticsProvider>
			<div ref={targetRef} className="flex w-full flex-col divide-y">
				{isLoading && (
					<MaxWidthWrapper className="flex flex-col">
						<SkeletonHeader />
					</MaxWidthWrapper>
				)}

				{device && (
					<MaxWidthWrapper className="flex flex-col">
						<div className="flex justify-between">
							<div className="flex items-center gap-4">
								<h3 className="font-semibold text-lg">{device.name}</h3>
								<div className="flex items-center gap-2">
									<div className="size-2 rounded-full bg-success" />
									<span className="text-muted-foreground text-sm">
										{statuses[device.status].label}
									</span>
								</div>
							</div>

							<div className="flex gap-4">
								<Filters />

								<Button type="button" onClick={() => toPDF()}>
									<Download className="mr-2 size-4" />
									<span>Exportar PDF</span>
								</Button>
							</div>
						</div>

						<div className="mt-1 flex gap-4">
							<div className="size-16 rounded-md border bg-white p-2">
								<img src={device.image} alt={device.name} />
							</div>

							<div className="flex flex-col justify-between">
								<div className="space-x-1 text-sm">
									<span className="text-muted-foreground">Máquina:</span>
									<span>{device.machine}</span>
								</div>

								<div className="space-x-1 text-sm">
									<span className="text-muted-foreground">Modelo:</span>
									<span>{device.model}</span>
								</div>

								<div className="space-x-1 text-sm">
									<span className="text-muted-foreground">Responsável:</span>
									<span>John Doe</span>
								</div>
							</div>
						</div>
					</MaxWidthWrapper>
				)}

				<div className="flex-1">
					<MaxWidthWrapper className="grid grid-cols-4 gap-4">
						<PowerCard />
						{/* <PastEnergyCard /> */}
						<ElectricCurrentCard />
						<PowerFactorCard />
						<TemperatureCard />
						<VibrationCard />
					</MaxWidthWrapper>
				</div>
			</div>
		</AnalyticsProvider>
	);
}
