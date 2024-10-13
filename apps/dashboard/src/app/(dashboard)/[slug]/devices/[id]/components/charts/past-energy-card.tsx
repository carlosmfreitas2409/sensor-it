'use client';

import {
	Area,
	AreaChart,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from '@sensor-it/ui/components';

import { useAnalyticsFilterOption } from '../../hooks';

import { SkeletonCard } from '../skeleton-card';

const chartConfig = {
	value: {
		label: 'Energia',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function PastEnergyCard() {
	const { data, isLoading } = useAnalyticsFilterOption('past-energy');

	if (isLoading) {
		return <SkeletonCard className="col-span-2" />;
	}

	return (
		<Card className="col-span-2 flex flex-col rounded-2xl">
			<CardHeader className="p-4">
				<CardTitle>Uso de energia ontem</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-1 gap-4 p-4 pt-0">
				<div className="flex flex-col justify-between gap-4">
					<div className="flex flex-col">
						<span className="text-muted-foreground text-sm">por minuto</span>
						<div>
							<span className="font-semibold text-xl">{data?.perMinute}</span>
							<span className="ml-1">kW</span>
						</div>
					</div>

					<div className="flex flex-col">
						<span className="text-muted-foreground text-sm">por hora</span>
						<div>
							<span className="font-semibold text-xl">{data?.perHour}</span>
							<span className="ml-1">kW</span>
						</div>
					</div>

					<div className="flex flex-col">
						<span className="text-muted-foreground text-sm">em 3 horas</span>
						<div>
							<span className="font-semibold text-xl">{data?.perDay}</span>
							<span className="ml-1">kW</span>
						</div>
					</div>
				</div>

				<ChartContainer config={chartConfig} className="aspect-auto w-full">
					<AreaChart
						accessibilityLayer
						data={data?.values || []}
						margin={{
							left: 24,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="timestamp"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => {
								return new Date(value).toLocaleTimeString('en-US', {
									hour: 'numeric',
								});
							}}
						/>

						<YAxis tickLine={false} axisLine={false} tickCount={4} width={10} />

						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('pt-BR', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										});
									}}
								/>
							}
						/>

						<defs>
							<linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-value)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-value)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>

						<Area
							dataKey="value"
							type="natural"
							fill="url(#fillValue)"
							fillOpacity={0.4}
							stroke="var(--color-value)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
