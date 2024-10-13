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

const MIN_VALUE = 0;
const MAX_VALUE = 1;

const colors = [
	{ offset: '60%', color: '#45C14F' },
	{ offset: '90%', color: '#FF820E' },
];

const chartConfig = {
	value: {
		label: 'Fator de potência',
	},
} satisfies ChartConfig;

export function PowerFactorCard() {
	const { data, isLoading } = useAnalyticsFilterOption('powerFactor');

	const currentValue = data?.value ?? 0;

	const chartData = [
		{ name: 'Value', value: currentValue, fill: 'url(#factorGradient)' },
		{ name: 'Remaining', value: MAX_VALUE - currentValue, fill: '#F4F4F5' },
	];

	const gradientStops = useMemo(() => {
		const normalizedValue =
			(currentValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);

		return colors.map((color) => ({
			...color,
			offset: `${Math.min(Number.parseInt(color.offset) / normalizedValue, 100)}%`,
		}));
	}, [currentValue]);

	if (isLoading) {
		return <SkeletonCard />;
	}

	return (
		<Card className="flex flex-col rounded-2xl">
			<CardHeader className="p-4">
				<CardTitle>Fator de potência</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 px-4 py-0">
				<div className="h-[158px] overflow-hidden">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square w-full"
					>
						<PieChart>
							<defs>
								<linearGradient id="factorGradient" x1="0" y1="0" x2="1" y2="0">
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
								data={chartData}
								dataKey="value"
								outerRadius="100%"
								innerRadius="75%"
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
