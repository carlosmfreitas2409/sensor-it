export type Overview = {
	devices: {
		total: number;
		percentageOverLastMonth: number;
	};
	activeDevices: {
		total: number;
		percentageOverLastMonth: number;
	};
	failedMachines: {
		total: number;
		percentageOverLastMonth: number;
	};
};

export type AnalyticsEvent =
	| 'power'
	| 'past-energy'
	| 'last_temperature'
	| 'powerFactor'
	| 'current'
	| 'vibrations';

type TimeSerie = {
	timestamp: Date;
	value: number;
};

type AnalyticsPower = {
	real: {
		current: number;
		values: TimeSerie[];
	};
	apparent: {
		current: number;
		values: TimeSerie[];
	};
};

type AnalyticsPastEnergy = {
	perMinute: number;
	perHour: number;
	perDay: number;
	values: TimeSerie[];
};

type AnalyticsTemperature = {
	value: number;
	max: number;
	min: number;
};

type AnalyticsPowerFactor = {
	value: number;
};

type AnalyticsElectricCurrent = TimeSerie[];

type AnalyticsVibration = TimeSerie[];

export type Analytics<T extends AnalyticsEvent> = T extends 'power'
	? AnalyticsPower
	: T extends 'past-energy'
		? AnalyticsPastEnergy
		: T extends 'last_temperature'
			? AnalyticsTemperature
			: T extends 'powerFactor'
				? AnalyticsPowerFactor
				: T extends 'current'
					? AnalyticsElectricCurrent
					: T extends 'vibrations'
						? AnalyticsVibration
						: never;
