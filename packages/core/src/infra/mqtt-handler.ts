export interface IMqttHandler<T = unknown> {
	handle(message: T): Promise<void>;
}
