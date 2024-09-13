import { mqtt } from './client';

import { adaptMqttHandler } from './adapters/mqtt-handler-adapter';

import { makeAddMetricHandler } from '@/modules/metrics/mqtt-handlers/add-metric/factory';

const topics = ['hardware.add-metrics'] as const;

type Topic = (typeof topics)[number];

const addMetricHandler = adaptMqttHandler(makeAddMetricHandler());

export async function start() {
	await Promise.all(
		topics.map((topic) => {
			return mqtt.subscribeAsync(topic);
		}),
	);

	mqtt.on('message', async (topic, message) => {
		try {
			switch (topic as Topic) {
				case 'hardware.add-metrics':
					await addMetricHandler(message);
					break;
				default:
					console.error(`MQTT topic not handled: ${topic}`);
					break;
			}
		} catch (error) {
			console.log(`Error for topic: ${topic}`);
			console.error((error as Error).message);
		}
	});
}
