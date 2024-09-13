export type GeneralMetrics = {
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
