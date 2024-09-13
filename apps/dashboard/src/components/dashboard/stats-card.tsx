'use client';

import { useId, useMemo } from 'react';

import { cn } from '@sensor-it/utils';

import { ArrowDown, ArrowUp } from '@sensor-it/ui/icons';

import {
	Area,
	AreaChart,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ChartContainer,
	type ChartConfig,
} from '@sensor-it/ui/components';

const chartData = [
	{ machines: 14 },
	{ machines: 16 },
	{ machines: 8 },
	{ machines: 25 },
];

const riseChartConfig = {
	machines: {
		label: 'Máquinas',
		color: 'hsl(var(--success))',
	},
} satisfies ChartConfig;

const fallChartConfig = {
	machines: {
		label: 'Máquinas',
		color: 'hsl(var(--destructive))',
	},
} satisfies ChartConfig;

interface StatsCardProps {
	title: string;
	value: number;
	percentage: number;
}

export function StatsCard({ title, value, percentage }: StatsCardProps) {
	const id = useId();

	const formattedValue = new Intl.NumberFormat('pt-BR').format(value);
	const formattedPercentage = new Intl.NumberFormat('pt-BR', {
		style: 'percent',
		maximumFractionDigits: 0,
		signDisplay: 'never',
	}).format(percentage);

	const chartConfig = percentage < 0 ? fallChartConfig : riseChartConfig;

	const data = useMemo(() => {
		const dataClone = [...chartData];
		return percentage < 0 ? dataClone.reverse() : dataClone;
	}, [percentage]);

	return (
		<Card>
			<CardHeader className="p-5">
				<CardTitle className="font-bold text-base">{title}</CardTitle>
			</CardHeader>

			<CardContent className="flex items-end justify-between px-5 pb-5">
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-3xl">{formattedValue}</h2>

					<div
						className={cn(
							'flex items-center text-sm',
							percentage < 0 && 'text-destructive',
							percentage >= 0 && 'text-success',
						)}
					>
						{percentage < 0 ? (
							<ArrowDown className="mr-1 size-4" />
						) : (
							<ArrowUp className="mr-1 size-4" />
						)}

						<span className="font-medium">{formattedPercentage}</span>
						<span className="ml-1 text-muted-foreground">vs último mês</span>
					</div>
				</div>

				<div className="w-full max-w-28">
					<ChartContainer config={chartConfig}>
						<AreaChart data={data}>
							<defs>
								<linearGradient id={`fill${id}`} x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-machines)"
										stopOpacity={0.8}
									/>

									<stop
										offset="95%"
										stopColor="var(--color-machines)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>

							<Area
								dataKey="machines"
								type="natural"
								fill={`url(#fill${id})`}
								stroke="var(--color-machines)"
								stackId="a"
							/>
						</AreaChart>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	);
}
