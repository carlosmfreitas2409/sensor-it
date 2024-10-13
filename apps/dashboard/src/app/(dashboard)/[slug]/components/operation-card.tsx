'use client';

import {
	Area,
	AreaChart,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	type ChartConfig,
} from '@sensor-it/ui/components';

const chartData = [
	{ date: '2024-04-01', production: 222 },
	{ date: '2024-04-02', production: 97 },
	{ date: '2024-04-03', production: 167 },
	{ date: '2024-04-04', production: 242 },
	{ date: '2024-04-05', production: 373 },
	{ date: '2024-04-06', production: 301 },
	{ date: '2024-04-07', production: 245 },
	{ date: '2024-04-08', production: 409 },
	{ date: '2024-04-09', production: 59 },
	{ date: '2024-04-10', production: 261 },
	{ date: '2024-04-11', production: 327 },
	{ date: '2024-04-12', production: 292 },
	{ date: '2024-04-13', production: 342 },
	{ date: '2024-04-14', production: 137 },
	{ date: '2024-04-15', production: 120 },
	{ date: '2024-04-16', production: 138 },
	{ date: '2024-04-17', production: 446 },
	{ date: '2024-04-18', production: 364 },
	{ date: '2024-04-19', production: 243 },
	{ date: '2024-04-20', production: 89 },
	{ date: '2024-04-21', production: 137 },
	{ date: '2024-04-22', production: 224 },
	{ date: '2024-04-23', production: 138 },
	{ date: '2024-04-24', production: 387 },
	{ date: '2024-04-25', production: 215 },
	{ date: '2024-04-26', production: 75 },
	{ date: '2024-04-27', production: 383 },
	{ date: '2024-04-28', production: 122 },
	{ date: '2024-04-29', production: 315 },
	{ date: '2024-04-30', production: 454 },
	{ date: '2024-05-01', production: 165 },
	{ date: '2024-05-02', production: 293 },
	{ date: '2024-05-03', production: 247 },
	{ date: '2024-05-04', production: 385 },
	{ date: '2024-05-05', production: 481 },
	{ date: '2024-05-06', production: 498 },
	{ date: '2024-05-07', production: 388 },
	{ date: '2024-05-08', production: 149 },
	{ date: '2024-05-09', production: 227 },
	{ date: '2024-05-10', production: 293 },
	{ date: '2024-05-11', production: 335 },
	{ date: '2024-05-12', production: 197 },
	{ date: '2024-05-13', production: 197 },
	{ date: '2024-05-14', production: 448 },
	{ date: '2024-05-15', production: 473 },
	{ date: '2024-05-16', production: 338 },
	{ date: '2024-05-17', production: 499 },
	{ date: '2024-05-18', production: 315 },
	{ date: '2024-05-19', production: 235 },
	{ date: '2024-05-20', production: 177 },
	{ date: '2024-05-21', production: 82 },
	{ date: '2024-05-22', production: 81 },
	{ date: '2024-05-23', production: 252 },
	{ date: '2024-05-24', production: 294 },
	{ date: '2024-05-25', production: 201 },
	{ date: '2024-05-26', production: 213 },
	{ date: '2024-05-27', production: 420 },
	{ date: '2024-05-28', production: 233 },
	{ date: '2024-05-29', production: 78 },
	{ date: '2024-05-30', production: 340 },
	{ date: '2024-05-31', production: 178 },
	{ date: '2024-06-01', production: 178 },
	{ date: '2024-06-02', production: 470 },
	{ date: '2024-06-03', production: 103 },
	{ date: '2024-06-04', production: 439 },
	{ date: '2024-06-05', production: 88 },
	{ date: '2024-06-06', production: 294 },
	{ date: '2024-06-07', production: 323 },
	{ date: '2024-06-08', production: 385 },
	{ date: '2024-06-09', production: 438 },
	{ date: '2024-06-10', production: 155 },
	{ date: '2024-06-11', production: 92 },
	{ date: '2024-06-12', production: 492 },
	{ date: '2024-06-13', production: 81 },
	{ date: '2024-06-14', production: 426 },
	{ date: '2024-06-15', production: 307 },
	{ date: '2024-06-16', production: 371 },
	{ date: '2024-06-17', production: 475 },
	{ date: '2024-06-18', production: 107 },
	{ date: '2024-06-19', production: 341 },
	{ date: '2024-06-20', production: 408 },
	{ date: '2024-06-21', production: 169 },
	{ date: '2024-06-22', production: 317 },
	{ date: '2024-06-23', production: 480 },
	{ date: '2024-06-24', production: 132 },
	{ date: '2024-06-25', production: 141 },
	{ date: '2024-06-26', production: 434 },
	{ date: '2024-06-27', production: 448 },
	{ date: '2024-06-28', production: 149 },
	{ date: '2024-06-29', production: 103 },
	{ date: '2024-06-30', production: 446 },
];

const chartConfig = {
	production: {
		label: 'Operação',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function OperationCard() {
	return (
		<Card>
			<CardHeader className="border-b py-5">
				<CardTitle>Operação das máquinas</CardTitle>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="fillProduction" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-production)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-production)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>

						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString('pt-BR', {
									month: 'short',
									day: 'numeric',
								});
							}}
						/>

						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									indicator="dot"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('pt-BR', {
											month: 'short',
											day: 'numeric',
										});
									}}
								/>
							}
						/>

						<Area
							dataKey="production"
							type="natural"
							fill="url(#fillProduction)"
							stroke="var(--color-production)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
