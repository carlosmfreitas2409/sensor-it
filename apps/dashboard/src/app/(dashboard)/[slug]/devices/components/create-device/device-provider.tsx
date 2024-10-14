'use client';

import * as React from 'react';

import { BLE_CONFIG } from '@sensor-it/utils/constants';

import { isValidJson } from '@sensor-it/utils';

type CharacteristicEventTarget = EventTarget & {
	value: DataView;
};

type Network = {
	ssid: string;
	rssi: number;
	encryption: number;
};

type DeviceContextProps = {
	setDevice: (device: BluetoothRemoteGATTService | null) => void;
	connectToDevice: (
		name: string,
	) => Promise<BluetoothRemoteGATTService | undefined>;
	getNetworks: () => Promise<Network[]>;
	connectToWiFi: (ssid: string, password: string) => Promise<boolean>;
	setConnectedStatus: () => Promise<void>;
};

const DeviceContext = React.createContext<DeviceContextProps | null>(null);

function useDevice() {
	const context = React.useContext(DeviceContext);

	if (!context) {
		throw new Error('useDevice must be used within a <DeviceManager />');
	}

	return context;
}

function DeviceProvider({ children }: React.PropsWithChildren) {
	const networkChunks = React.useRef<string>('');

	const [device, setDevice] = React.useState<BluetoothRemoteGATTService | null>(
		null,
	);

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

	async function connectToDevice(name: string) {
		const device = await navigator.bluetooth.requestDevice({
			filters: [{ services: [BLE_CONFIG.serviceUUID] }, { name }],
		});

		const gatt = await device.gatt?.connect();

		const service = await gatt?.getPrimaryService(BLE_CONFIG.serviceUUID);

		return service;
	}

	async function getNetworks(): Promise<Network[]> {
		if (!device) return [];

		const { characteristic } = await getCharacteristicAndReadValue(
			device,
			BLE_CONFIG.networkScanCharUUID,
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
		ssid: string,
		password: string,
	): Promise<boolean> {
		if (!device) return false;

		const { wifiSSIDCharUUID, wifiPassCharUUID, wifiStatusCharUUID } =
			BLE_CONFIG;

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

	async function setConnectedStatus() {
		if (!device) return;

		const { characteristic } = await getCharacteristicAndReadValue(
			device,
			BLE_CONFIG.scanStatusCharUUID,
		);

		await characteristic.writeValueWithResponse(encode('COMPLETED'));
	}

	return (
		<DeviceContext.Provider
			value={{
				setDevice,
				connectToDevice,
				getNetworks,
				connectToWiFi,
				setConnectedStatus,
			}}
		>
			{children}
		</DeviceContext.Provider>
	);
}

export { DeviceProvider, useDevice };
