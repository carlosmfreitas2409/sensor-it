import { createContext, useContext, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { endOfDay, startOfDay, subDays } from 'date-fns';

type Filters = {
	deviceId: string;
	start?: string;
	end?: string;
	interval?: string;
};

interface AnalyticsContextProps {
	deviceId: string;
	start?: Date;
	end?: Date;
	interval?: string;
	filters: Filters;
}

export const AnalyticsContext = createContext<AnalyticsContextProps>(
	{} as AnalyticsContextProps,
);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();

	const { id: deviceId } = useParams() as { id: string };

	// biome-ignore lint/correctness/useExhaustiveDependencies: not needed
	const { start, end } = useMemo(() => {
		const hasRange = searchParams?.has('start') && searchParams?.has('end');

		return {
			start: hasRange
				? startOfDay(
						new Date(searchParams?.get('start') || subDays(new Date(), 1)),
					)
				: undefined,

			end: hasRange
				? endOfDay(new Date(searchParams?.get('end') || new Date()))
				: undefined,
		};
	}, [searchParams?.get('start'), searchParams?.get('end')]);

	const interval =
		start || end ? undefined : searchParams?.get('interval') ?? '24h';

	const filters = {
		deviceId,
		...(start && end && { start: start.toISOString(), end: end.toISOString() }),
		...(interval && { interval }),
	};

	return (
		<AnalyticsContext.Provider
			value={{
				deviceId,
				start,
				end,
				interval,
				filters,
			}}
		>
			{children}
		</AnalyticsContext.Provider>
	);
}

export function useAnalytics() {
	const context = useContext(AnalyticsContext);

	if (!context) {
		throw new Error('useAnalytics must be used within a AnalyticsProvider');
	}

	return context;
}
