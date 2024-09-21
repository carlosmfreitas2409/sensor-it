import { MetricService } from '@sensor-it/langchain';

import { mqtt } from './client';

const topics = ['hardware.add-metrics'] as const;

type Topic = (typeof topics)[number];

const metricService = new MetricService();

export async function start() {
	await Promise.all(
		topics.map((topic) => {
			return mqtt.subscribeAsync(topic);
		}),
	);

	mqtt.on('message', async (topic, message) => {
		const payload = JSON.parse(message.toString());

		try {
			switch (topic as Topic) {
				case 'hardware.add-metrics': {
					const { atlasOrganizationId, serialNumber, type, value } = payload;

					await metricService.addMetrics([
						{
							atlasOrganizationId,
							serialNumber,
							type,
							value,
						},
					]);

					break;
				}

				default: {
					console.error(`MQTT topic not handled: ${topic}`);
					break;
				}
			}
		} catch (error) {
			console.log(`Error for topic: ${topic}`);
			console.error((error as Error).message);
		}
	});
}
