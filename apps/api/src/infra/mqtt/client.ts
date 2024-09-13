import { connectAsync } from 'mqtt';

import { env } from '@sensor-it/env/server';

const mqtt = await connectAsync(env.MQTT_BROKER, {
	clientId: 'api',
	username: env.MQTT_USERNAME,
	password: env.MQTT_PASSWORD,
	clean: true,
});

export { mqtt };
