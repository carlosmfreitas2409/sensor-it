import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import {
	Accordion,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	ScrollArea,
} from '@sensor-it/ui/components';

import { useDevice } from '../device-provider';

import { NetworksSkeleton } from '../networks-skeleton';
import { NetworkItem } from '../network-item';

import { Step, type CreateDeviceFormData } from '../schema';

export function SetupNetworkStep() {
	const [isConnecting, setIsConnecting] = useState(false);

	const { getNetworks, connectToWiFi } = useDevice();

	const form = useFormContext<CreateDeviceFormData>();

	const { data: networks, isLoading } = useQuery({
		queryKey: ['networks'],
		queryFn: () => getNetworks(),
	});

	async function handleConnectWiFi(ssid: string, password: string) {
		setIsConnecting(true);

		const isConnected = await connectToWiFi(ssid, password);

		if (isConnected) {
			form.setValue('step', Step.SETUP_DEVICE);
		}

		setIsConnecting(false);
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Selecione a rede Wi-Fi</DialogTitle>
				<DialogDescription>
					Selecione a rede Wi-Fi que deseja conectar.
					<br />
					Apenas redes 2G são suportadas.
				</DialogDescription>
			</DialogHeader>

			<Accordion type="single" collapsible asChild>
				<ScrollArea className="-mx-2 flex max-h-80 flex-col gap-2">
					{isLoading && <NetworksSkeleton />}

					{(networks || []).map((network) => {
						return (
							<NetworkItem
								key={network.ssid}
								network={network}
								isConnecting={isConnecting}
								onConnectWiFi={handleConnectWiFi}
							/>
						);
					})}
				</ScrollArea>
			</Accordion>
		</>
	);
}
