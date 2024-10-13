'use client';

import { formatChartDate } from '@sensor-it/utils';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from '@sensor-it/ui/components';

import { useAnalyticsFilterOption } from '../../hooks';

import { useAnalytics } from '../analytics-provider';

import { SkeletonCard } from '../skeleton-card';

const chartConfig = {
	value: {
		label: 'Corrente (A)',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function ElectricCurrentCard() {
	const { data, isLoading } = useAnalyticsFilterOption('current');

	const { start, end, interval } = useAnalytics();

	if (isLoading) {
		return <SkeletonCard className="col-span-2" />;
	}

	return (
		<Card className="col-span-2 flex flex-col rounded-2xl">
			<CardHeader className="p-4">
				<CardTitle>Corrente (A)</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 p-4 pt-0">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-full w-full"
				>
					<LineChart
						accessibilityLayer
						data={data || []}
						margin={{
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
								return formatChartDate({
									value,
									start,
									end,
									interval,
								});
							}}
						/>

						<YAxis tickLine={false} axisLine={false} tickSize={32} />

						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									labelFormatter={(value) => {
										return formatChartDate({
											value,
											start,
											end,
											interval,
										});
									}}
								/>
							}
						/>

						<Line
							dataKey="value"
							type="monotone"
							stroke="var(--color-value)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
