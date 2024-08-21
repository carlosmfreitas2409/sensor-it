import { useRef } from 'react';

import { isValidJson } from '@sensor-it/utils';

import { bleConfig } from '@/config/ble';

type CharacteristicEventTarget = EventTarget & {
	value: DataView;
};

interface Network {
	ssid: string;
	rssi: number;
	encryption: number;
}

function encode(value: string) {
	const encoder = new TextEncoder();
	return encoder.encode(value);
}

function decode(value: ArrayBuffer) {
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(value);
}

async function getCharacteristicAndReadValue(
	service: BluetoothRemoteGATTService,
	uuid: string,
) {
	const characteristic = await service.getCharacteristic(uuid);

	const value = await characteristic.readValue();

	return { characteristic, value: decode(value.buffer) };
}

export function useDevice() {
	const networkChunks = useRef<string>('');

	async function connectToDevice(name: string) {
		const device = await navigator.bluetooth.requestDevice({
			filters: [{ services: [bleConfig.serviceUUID] }, { name }],
		});

		const gatt = await device.gatt?.connect();

		const service = await gatt?.getPrimaryService(bleConfig.serviceUUID);

		return service;
	}

	async function getNetworks(
		device: BluetoothRemoteGATTService | null,
	): Promise<Network[]> {
		if (!device) return [];

		const { characteristic } = await getCharacteristicAndReadValue(
			device,
			bleConfig.networkScanCharUUID,
		);

		await characteristic.startNotifications();

		return new Promise((resolve) => {
			function onChangeNetworkValue(event: Event) {
				const value = (event.target as CharacteristicEventTarget).value;

				const decodedValue = decode(value.buffer);

				networkChunks.current += decodedValue;

				const isCompleted = isValidJson(networkChunks.current);

				if (!isCompleted) return;

				const parsedNetworks = JSON.parse(networkChunks.current)
					.networks as Network[];

				const filteredNetworks = parsedNetworks.filter(
					(network, index, self) =>
						network.ssid &&
						self.findIndex((t) => t.ssid === network.ssid) === index,
				);

				characteristic.stopNotifications();

				characteristic.removeEventListener(
					'characteristicvaluechanged',
					onChangeNetworkValue,
				);

				resolve(filteredNetworks);
			}

			characteristic.addEventListener(
				'characteristicvaluechanged',
				onChangeNetworkValue,
			);

			characteristic.writeValueWithResponse(encode(''));
		});
	}

	async function connectToWiFi(
		device: BluetoothRemoteGATTService | null,
		ssid: string,
		password: string,
	): Promise<boolean> {
		if (!device) return false;

		const { wifiSSIDCharUUID, wifiPassCharUUID, wifiStatusCharUUID } =
			bleConfig;

		const [{ characteristic: ssidChar }, { characteristic: passChar }, status] =
			await Promise.all([
				getCharacteristicAndReadValue(device, wifiSSIDCharUUID),
				getCharacteristicAndReadValue(device, wifiPassCharUUID),
				getCharacteristicAndReadValue(device, wifiStatusCharUUID),
			]);

		await status.characteristic.startNotifications();

		await Promise.all([
			ssidChar.writeValueWithResponse(encode(ssid)),
			passChar.writeValueWithResponse(encode(password)),
		]);

		return new Promise((resolve) => {
			function onWiFiStatusChange(event: Event) {
				const value = (event.target as CharacteristicEventTarget).value;

				const decodedValue = decode(value.buffer);

				if (decodedValue !== 'GOT_IP') return;

				status.characteristic.stopNotifications();

				status.characteristic.removeEventListener(
					'characteristicvaluechanged',
					onWiFiStatusChange,
				);

				resolve(true);
			}

			status.characteristic.addEventListener(
				'characteristicvaluechanged',
				onWiFiStatusChange,
			);
		});
	}

	return { connectToDevice, getNetworks, connectToWiFi };
}
