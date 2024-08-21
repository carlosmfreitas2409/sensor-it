declare module '@masuidrive/esp-network-config-ble' {
	export class BLEUART {
		constructor(
			name: string,
			serviceUUID?: string,
			rxUUID?: string,
			txUUID?: string,
		);
		start(): Promise<boolean>;
	}
}
