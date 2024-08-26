import { client } from './client';

const topics = ['helios.add-metric'] as const;

type Topic = (typeof topics)[number];

export async function start() {
	await Promise.all(
		topics.map((topic) => {
			return client.subscribeAsync(topic);
		}),
	);

	client.on('message', (topic, message) => {
		try {
			switch (topic as Topic) {
				case 'helios.add-metric':
					console.log(message.toString());
					break;
				default:
					console.error(`MQTT topic not handled: ${topic}`);
					break;
			}
		} catch (error) {
			console.log(`Error for message: ${message.toString()}`);
			console.error(error);
		}
	});
}
