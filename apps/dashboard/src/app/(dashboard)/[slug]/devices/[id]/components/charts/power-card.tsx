'use client';

import { useMemo } from 'react';

import { formatChartDate } from '@sensor-it/utils';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CartesianGrid,
	ChartContainer,
	XAxis,
	type ChartConfig,
	YAxis,
	AreaChart,
	Area,
	ChartTooltip,
	ChartTooltipContent,
} from '@sensor-it/ui/components';

import { useAnalyticsFilterOption } from '../../hooks';

import { useAnalytics } from '../analytics-provider';

import { SkeletonCard } from '../skeleton-card';

const chartConfig = {
	real: {
		label: 'Potência Ativa (kW)',
		color: 'hsl(145, 63%, 49%)',
	},
	// apparent: {
	// 	label: 'Potência Aparente (kVA)',
	// 	color: 'hsl(48, 100%, 50%)',
	// },
} satisfies ChartConfig;

export function PowerCard() {
	const { data, isLoading } = useAnalyticsFilterOption('power');

	const { start, end, interval } = useAnalytics();

	const chartData = useMemo(() => {
		return (data?.real.values || []).map((realItem) => {
			const apparentItem = data?.apparent.values.find(
				(a) =>
					new Date(a.timestamp).getTime() ===
					new Date(realItem.timestamp).getTime(),
			);

			return {
				timestamp: realItem.timestamp,
				real: realItem.value,
				apparent: apparentItem ? apparentItem.value : 0,
			};
		});
	}, [data?.apparent.values, data?.real.values]);

	const { domain, ticks } = useMemo(() => {
		const allValues = chartData.flatMap((entry) => [
			entry.real,
			entry.apparent,
		]);

		const maxAbs = Math.max(...allValues.map(Math.abs));

		const roundedMaxAbs = Math.ceil(maxAbs / 100) * 100;

		const calculatedTicks = [
			-roundedMaxAbs,
			-roundedMaxAbs / 2,
			0,
			roundedMaxAbs / 2,
			roundedMaxAbs,
		];

		return {
			domain: [-roundedMaxAbs, roundedMaxAbs],
			ticks: calculatedTicks,
		};
	}, [chartData]);

	if (isLoading) {
		return <SkeletonCard className="col-span-2" />;
	}

	return (
		<Card className="col-span-2 flex flex-col rounded-2xl">
			<CardHeader className="p-4">
				<CardTitle>Energia</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-1 gap-4 p-4 pt-0">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<div className="mb-1 flex items-center gap-2">
							<div className="size-2 rounded-full bg-green-500" />
							<span className="whitespace-nowrap font-medium text-muted-foreground text-sm">
								Potência Ativa
							</span>
						</div>

						<div>
							<span className="font-semibold text-xl">
								{data?.real.current}
							</span>
							<span className="ml-1">kW</span>
						</div>
					</div>

					{/* <div className="flex flex-col">
						<div className="mb-1 flex items-center gap-2">
							<div className="size-2 rounded-full bg-yellow-500" />
							<span className="whitespace-nowrap font-medium text-muted-foreground text-sm">
								Potência Aparente
							</span>
						</div>

						<div>
							<span className="font-semibold text-xl">
								{data?.apparent.current}
							</span>
							<span className="ml-1">kVA</span>
						</div>
					</div> */}
				</div>

				<ChartContainer config={chartConfig} className="aspect-auto w-full">
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 5,
							bottom: 5,
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="timestamp"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={16}
							tickFormatter={(value) => {
								return formatChartDate({ value, start, end, interval });
							}}
						/>

						<YAxis
							tickLine={false}
							axisLine={false}
							domain={domain}
							ticks={ticks}
							width={32}
						/>

						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[200px]"
									labelFormatter={(value) => {
										return formatChartDate({ value, start, end, interval });
									}}
								/>
							}
						/>

						<defs>
							<linearGradient id="fillReal" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-real)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-real)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillApparent" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-apparent)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-apparent)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>

						<Area
							dataKey="real"
							type="linear"
							fill="url(#fillReal)"
							fillOpacity={0.4}
							stroke="var(--color-real)"
						/>

						{/* <Area
							dataKey="apparent"
							type="linear"
							fill="url(#fillApparent)"
							fillOpacity={0.4}
							stroke={'var(--color-apparent)'}
						/> */}
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
