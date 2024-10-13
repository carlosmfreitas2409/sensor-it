'use client';

import { useRouterStuff } from '@sensor-it/ui/hooks';

import { DateRangePicker } from '@sensor-it/ui/components';

import { DATE_PRESETS } from '../mock';
import { useAnalytics } from './analytics-provider';

export function Filters() {
	const { queryParams } = useRouterStuff();

	const { start, end, interval } = useAnalytics();

	return (
		<div>
			<DateRangePicker
				className="w-full sm:min-w-[200px] md:w-fit"
				value={
					start && end
						? {
								from: start,
								to: end,
							}
						: undefined
				}
				presetId={!start || !end ? interval ?? '24h' : undefined}
				presets={DATE_PRESETS.map(({ display, value, interval }) => {
					return {
						id: value,
						label: display,
						dateRange: {
							from: interval.startDate,
							to: new Date(),
						},
					};
				})}
				componentProps={{
					PopoverContent: {
						align: 'end',
					},
				}}
				onValueChange={(range, preset) => {
					if (preset) {
						queryParams({
							del: ['start', 'end'],
							set: { interval: preset.id },
						});

						return;
					}

					if (!range || !range.from || !range.to) return;

					queryParams({
						del: ['interval'],
						set: {
							start: range.from.toISOString(),
							end: range.to.toISOString(),
						},
					});
				}}
			/>
		</div>
	);
}
