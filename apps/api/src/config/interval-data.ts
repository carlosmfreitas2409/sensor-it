export const INTERVAL_DATA: Record<
	string,
	{
		startDate: Date;
		granularity: 'minute' | 'hour' | 'day' | 'month';
	}
> = {
	'1h': {
		startDate: new Date(Date.now() - 3600000),
		granularity: 'minute',
	},
	'24h': {
		startDate: new Date(Date.now() - 86400000),
		granularity: 'hour',
	},
	'7d': {
		startDate: new Date(Date.now() - 604800000),
		granularity: 'day',
	},
	'30d': {
		startDate: new Date(Date.now() - 2592000000),
		granularity: 'day',
	},
	'90d': {
		startDate: new Date(Date.now() - 7776000000),
		granularity: 'day',
	},
	ytd: {
		startDate: new Date(new Date().getFullYear(), 0, 1),
		granularity: 'month',
	},
	'1y': {
		startDate: new Date(Date.now() - 31556952000),
		granularity: 'month',
	},
};
