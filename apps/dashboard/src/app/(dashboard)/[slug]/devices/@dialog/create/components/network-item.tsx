import { useMemo, useState } from 'react';

import { Lock, Wifi, WifiHigh, WifiLow, WifiZero } from '@sensor-it/ui/icons';

import {
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	Button,
	Input,
} from '@sensor-it/ui/components';

interface NetworkItemProps {
	network: {
		ssid: string;
		rssi: number;
		encryption: number;
	};
	isConnecting: boolean;
	onConnectWiFi: (ssid: string, password: string) => Promise<void>;
}

export function NetworkItem({
	network,
	isConnecting,
	onConnectWiFi,
}: NetworkItemProps) {
	const [password, setPassword] = useState<string>('');

	const WifiIcon = useMemo(() => {
		const wifiLevels = [
			{ threshold: -50, icon: Wifi },
			{ threshold: -60, icon: WifiHigh },
			{ threshold: -67, icon: WifiLow },
		];

		return (
			wifiLevels.find((level) => network.rssi > level.threshold)?.icon ||
			WifiZero
		);
	}, [network.rssi]);

	return (
		<AccordionItem value={network.ssid} className="border-0">
			<AccordionTrigger
				showCloseButton={false}
				className="h-10 rounded-md px-2 font-normal hover:bg-muted/40 hover:no-underline"
			>
				<span>{network.ssid}</span>
				<div className="flex items-center gap-4">
					{network.encryption !== 0 && <Lock className="size-4" />}
					<WifiIcon className="size-4" />
				</div>
			</AccordionTrigger>

			<AccordionContent className="flex gap-2 px-2 py-2">
				<Input
					type="password"
					className="h-9"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					type="button"
					size="sm"
					variant="secondary"
					onClick={() => onConnectWiFi(network.ssid, password)}
					isLoading={isConnecting}
				>
					Conectar
				</Button>
			</AccordionContent>
		</AccordionItem>
	);
}
