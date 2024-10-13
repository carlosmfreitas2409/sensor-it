export const DATE_PRESETS = [
	{
		display: 'Última hora',
		value: '1h',
		interval: {
			startDate: new Date(Date.now() - 3600000),
			granularity: 'minute',
		},
	},
	{
		display: 'Últimos 24 horas',
		value: '24h',
		interval: {
			startDate: new Date(Date.now() - 86400000),
			granularity: 'hour',
		},
	},
	{
		display: 'Últimos 7 dias',
		value: '7d',
		interval: {
			startDate: new Date(Date.now() - 604800000),
			granularity: 'day',
		},
	},
	{
		display: 'Últimos 30 dias',
		value: '30d',
		interval: {
			startDate: new Date(Date.now() - 2592000000),
			granularity: 'day',
		},
	},
	{
		display: 'Últimos 3 meses',
		value: '90d',
		interval: {
			startDate: new Date(Date.now() - 7776000000),
			granularity: 'day',
		},
	},
	{
		display: 'Desde o início do ano',
		value: 'ytd',
		interval: {
			startDate: new Date(new Date().getFullYear(), 0, 1),
			granularity: 'month',
		},
	},
	{
		display: 'Últimos 12 meses',
		value: '1y',
		interval: {
			startDate: new Date(Date.now() - 31556952000),
			granularity: 'month',
		},
	},
];
