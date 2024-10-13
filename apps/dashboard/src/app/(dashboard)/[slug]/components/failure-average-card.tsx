'use client';

import {
	Bar,
	BarChart,
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
} from '@sensor-it/ui/components';

const chartData = [
	{ month: 'Jan', seriesOne: 186, seriesTwo: 80 },
	{ month: 'Feb', seriesOne: 305, seriesTwo: 200 },
	{ month: 'Mar', seriesOne: 237, seriesTwo: 120 },
	{ month: 'Apr', seriesOne: 73, seriesTwo: 190 },
	{ month: 'May', seriesOne: 209, seriesTwo: 130 },
	{ month: 'Jun', seriesOne: 214, seriesTwo: 140 },
	{ month: 'Jul', seriesOne: 214, seriesTwo: 140 },
	{ month: 'Aug', seriesOne: 214, seriesTwo: 140 },
	{ month: 'Sep', seriesOne: 214, seriesTwo: 140 },
	{ month: 'Oct', seriesOne: 214, seriesTwo: 140 },
	{ month: 'Nov', seriesOne: 214, seriesTwo: 140 },
	{ month: 'Dec', seriesOne: 214, seriesTwo: 140 },
];
const chartConfig = {
	seriesOne: {
		label: 'Série 1',
		color: 'hsl(var(--chart-1))',
	},
	seriesTwo: {
		label: 'Série 2',
		color: 'hsl(var(--chart-1) / .4)',
	},
} satisfies ChartConfig;

export function FailureAverageCard() {
	return (
		<Card>
			<CardHeader className="border-b py-5">
				<CardTitle>Média de falhas</CardTitle>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[180px] w-full"
				>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Bar
							dataKey="seriesOne"
							stackId="a"
							fill="var(--color-seriesOne)"
							radius={[0, 0, 4, 4]}
						/>
						<Bar
							dataKey="seriesTwo"
							stackId="a"
							fill="var(--color-seriesTwo)"
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
