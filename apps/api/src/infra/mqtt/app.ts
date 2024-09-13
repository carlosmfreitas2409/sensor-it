import { start } from './consumer';

start().then(() => {
	console.log('[MQTT] Consumer started!');
});
