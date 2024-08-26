import { connectAsync, type MqttClient } from 'mqtt';

import { env } from '@sensor-it/env/server';

let client: MqttClient;

try {
	client = await connectAsync(env.MQTT_BROKER, {
		clientId: 'helios',
		username: env.MQTT_USERNAME,
		password: env.MQTT_PASSWORD,
		clean: true,
	});
} catch (error) {
	console.log(error);
}

export { client };
