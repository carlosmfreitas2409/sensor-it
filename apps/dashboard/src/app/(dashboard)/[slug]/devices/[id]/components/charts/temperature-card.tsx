'use client';
import { useMemo } from 'react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ChartContainer,
	ChartLabel,
	Pie,
	PieChart,
	type ChartConfig,
} from '@sensor-it/ui/components';

import { useAnalyticsFilterOption } from '../../hooks';

import { SkeletonCard } from '../skeleton-card';

const colors = [
	{ offset: '0%', color: '#01B7F9' },
	{ offset: '33%', color: '#45C14F' },
	{ offset: '66%', color: '#FCBD1A' },
	{ offset: '100%', color: '#FF820E' },
];

const chartConfig = {
	value: {
		label: 'Temperatura',
	},
} satisfies ChartConfig;

export function TemperatureCard() {
	const { data, isLoading } = useAnalyticsFilterOption('last_temperature');

	const currentValue = data?.value ?? 0;
	const minValue = data?.min ?? 0;
	const maxValue = data?.max ?? 100;

	const chartData = [
		{ name: 'Value', value: currentValue, fill: 'url("#gradient")' },
		{ name: 'Remaining', value: maxValue - currentValue, fill: '#F4F4F5' },
	];

	const thresholds = colors.map(({ color }) => ({
		value: maxValue / colors.length,
		fill: color,
	}));

	const gradientStops = useMemo(() => {
		const normalizedValue = (currentValue - minValue) / (maxValue - minValue);

		return colors.map((color) => ({
			...color,
			offset: `${Math.min(Number.parseInt(color.offset) / normalizedValue, 100)}%`,
		}));
	}, [currentValue, minValue, maxValue]);

	if (isLoading) {
		return <SkeletonCard />;
	}

	return (
		<Card className="rounded-2xl">
			<CardHeader className="p-4">
				<CardTitle>Temperatura (°C)</CardTitle>
			</CardHeader>

			<CardContent className="px-4 py-0">
				<div className="h-[158px] overflow-hidden">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square w-full"
					>
						<PieChart>
							<defs>
								<linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
									{gradientStops.map((stop, index) => (
										<stop
											key={index}
											offset={stop.offset}
											stopColor={stop.color}
										/>
									))}
								</linearGradient>
							</defs>

							<Pie
								data={thresholds}
								dataKey="value"
								innerRadius="93%"
								outerRadius="100%"
								startAngle={190}
								endAngle={-10}
							/>

							<Pie
								data={chartData}
								dataKey="value"
								outerRadius="90%"
								innerRadius="70%"
								startAngle={190}
								endAngle={-10}
							>
								<ChartLabel
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={Number(viewBox.cy) * 0.9}
													textAnchor="middle"
													dominantBaseline="middle"
												>
													<tspan className="fill-foreground font-bold text-3xl">
														{currentValue}
													</tspan>
													<tspan className="fill-muted-foreground text-sm">
														{' '}
														°C
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	);
}
