'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { isDesktop } from '@sensor-it/utils';

import { createDevice } from '@/services/devices/create-device';

import { useForm } from '@/hooks/use-form';
import { useOrganization } from '@/hooks/use-organization';

import { Dialog, Form } from '@sensor-it/ui/components';

import { InterceptedDialogContent } from '@/components/intercepted-dialog-content';

import { ChangePlatformStep } from './components/change-platform';
import { SetupNetworkStep } from './components/setup-network';
import { ConnectDeviceStep } from './components/connect-device';
import { SetupDeviceStep } from './components/setup-device';

import { type CreateDeviceFormData, createDeviceSchema, Step } from './schema';

export default function CreateDevice() {
	const [device, setDevice] = useState<BluetoothRemoteGATTService | null>(null);

	const router = useRouter();

	const slug = useOrganization();

	const [form, handleSubmit] = useForm<CreateDeviceFormData>({
		onSubmit: handleCreateDevice,
		schema: createDeviceSchema,
		defaultValues: {
			step: isDesktop() ? Step.CHANGE_PLATFORM : Step.SMARTPHONE_AUTHENTICATION,
			name: '',
			machine: '',
			assigneeId: '',
			model: '',
			serialNumber: '',
		},
	});

	const { mutateAsync: createDeviceFn } = useMutation({
		mutationFn: createDevice,
	});

	const step = form.watch('step');

	async function handleCreateDevice(data: CreateDeviceFormData) {
		const { name, machine, assigneeId, model, serialNumber } = data;

		if (!slug) {
			return;
		}

		try {
			await createDeviceFn({
				slug,
				body: { name, machine, assigneeId, model, serialNumber },
			});

			toast.success('Dispositivo criado com sucesso!');

			router.push(`/${slug}/devices`);
		} catch (err) {
			toast.error('Erro ao criar dispositivo. Por favor, tente novamente.');
		}
	}

	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<Form methods={form} onSubmit={handleSubmit} className="space-y-4">
					{step === Step.CHANGE_PLATFORM && <ChangePlatformStep />}

					{step === Step.CONNECT_DEVICE && (
						<ConnectDeviceStep
							onConnectDevice={(service) => {
								setDevice(service);
							}}
						/>
					)}

					{step === Step.SETUP_NETWORK && <SetupNetworkStep device={device} />}

					{step === Step.SETUP_DEVICE && <SetupDeviceStep />}
				</Form>
			</InterceptedDialogContent>
		</Dialog>
	);
}
