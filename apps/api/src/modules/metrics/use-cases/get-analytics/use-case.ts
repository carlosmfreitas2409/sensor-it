import { getDaysDifference } from '@sensor-it/utils';

import { INTERVAL_DATA } from '@/config/interval-data';

import { NotFoundException } from '@/infra/http/errors';

import {
	type Event,
	type EventSchema,
	buildAnalytics,
} from '@/infra/lib/tinybird/get-analytics';

import type { IDeviceRepository } from '@/modules/devices/repositories/interfaces/device-repository';

import type { GetAnalyticsInput, IGetAnalyticsUseCase } from './dto';

export class GetAnalyticsUseCase implements IGetAnalyticsUseCase {
	constructor(private readonly deviceRepository: IDeviceRepository) {}

	async execute({ deviceId, event, interval, start, end }: GetAnalyticsInput) {
		const device = await this.deviceRepository.findById(deviceId);

		if (!device) {
			throw new NotFoundException('Device not found');
		}

		let granularity: 'minute' | 'hour' | 'day' | 'month' = 'day';

		if (start) {
			start = new Date(start);
			end = end ? new Date(end) : new Date(Date.now());

			const daysDifference = getDaysDifference(start, end);

			if (daysDifference <= 2) {
				granularity = 'hour';
			} else if (daysDifference > 180) {
				granularity = 'month';
			}

			if (start > end) {
				[start, end] = [end, start];
			}
		} else {
			interval = interval ?? '24h';
			granularity = INTERVAL_DATA[interval].granularity;
			start = INTERVAL_DATA[interval].startDate;
			end = new Date(Date.now());
		}

		const filter = {
			serialNumber: device.serialNumber,
			start: start.toISOString().replace('T', ' ').replace('Z', ''),
			end: end.toISOString().replace('T', ' ').replace('Z', ''),
			granularity,
			timezone: 'UTC',
		};

		switch (event) {
			case 'power': {
				const [realPowerResponse, apparentPowerResponse] = await Promise.all([
					buildAnalytics('real_power')(filter),
					buildAnalytics('apparent_power')(filter),
				]);

				const realPowerData =
					realPowerResponse.data as EventSchema<'real_power'>[];

				const apparentPowerData =
					apparentPowerResponse.data as EventSchema<'real_power'>[];

				const currentRealPower =
					realPowerData[realPowerData.length - 1]?.value ?? 0;

				const currentApparentPower =
					apparentPowerData[apparentPowerData.length - 1]?.value ?? 0;

				return {
					real: {
						current: currentRealPower,
						values: realPowerData,
					},
					apparent: {
						current: currentApparentPower,
						values: apparentPowerData,
					},
				};
			}
			case 'last_temperature': {
				const response = await buildAnalytics(event as Event)(filter);
				const data = response.data as EventSchema<'last_temperature'>[];

				const { last_temp, hot_threshold, cold_threshold } = data[0] || {};

				return {
					value: last_temp,
					max: hot_threshold,
					min: cold_threshold,
				};
			}
			case 'powerFactor':
				return {
					value: 0.92,
				};
			case 'current':
			case 'vibrations': {
				const response = await buildAnalytics(event as Event)(filter);
				return response.data;
			}
		}
	}
}
