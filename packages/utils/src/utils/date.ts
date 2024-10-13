export function getDaysDifference(startDate: Date, endDate: Date) {
	const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

type FormatChartDateInput = {
	value: string | Date;
	start?: Date;
	end?: Date;
	interval?: string;
};

export function formatChartDate({
	value,
	start,
	end,
	interval,
}: FormatChartDateInput) {
	const date = new Date(value);

	if (start && end) {
		const daysDifference = getDaysDifference(start, end);

		if (daysDifference <= 2) {
			return date.toLocaleTimeString('pt-BR', {
				hour: 'numeric',
				minute: 'numeric',
			});
		}

		if (daysDifference > 180) {
			return date.toLocaleDateString('pt-BR', {
				month: 'short',
				year: 'numeric',
			});
		}
	} else if (interval) {
		switch (interval) {
			case '1h':
			case '24h':
				return date.toLocaleTimeString('pt-BR', {
					hour: 'numeric',
					minute: 'numeric',
				});
			case 'ytd':
			case '1y':
			case 'all':
				return date.toLocaleDateString('pt-BR', {
					month: 'short',
					year: 'numeric',
				});
			default:
				break;
		}
	}

	return date.toLocaleDateString('pt-BR', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	});
}
