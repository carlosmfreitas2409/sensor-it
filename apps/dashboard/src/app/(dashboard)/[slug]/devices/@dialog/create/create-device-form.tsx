'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { isDesktop } from '@sensor-it/utils';

import { createDevice } from '@/services/devices/create-device';

import { useForm } from '@/hooks/use-form';
import { useOrganization } from '@/hooks/use-organization';

import { Form } from '@sensor-it/ui/components';

import { useDevice } from './components/device-manager';

import { ChangePlatformStep } from './components/steps/change-platform';
import { SetupNetworkStep } from './components/steps/setup-network';
import { ConnectDeviceStep } from './components/steps/connect-device';
import { SetupDeviceStep } from './components/steps/setup-device';

import { type CreateDeviceFormData, createDeviceSchema, Step } from './schema';

export function CreateDeviceForm() {
	const router = useRouter();

	const slug = useOrganization();

	const { setConnectedStatus } = useDevice();

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
		if (!slug) return;

		const { name, machine, assigneeId, model, serialNumber } = data;

		try {
			await createDeviceFn({
				slug,
				body: { name, machine, assigneeId, model, serialNumber },
			});

			setConnectedStatus();

			toast.success('Dispositivo criado com sucesso!');

			router.push(`/${slug}/devices`);
		} catch (err) {
			toast.error('Erro ao criar dispositivo. Por favor, tente novamente.');
		}
	}

	return (
		<Form methods={form} onSubmit={handleSubmit} className="space-y-4">
			{step === Step.CHANGE_PLATFORM && <ChangePlatformStep />}
			{step === Step.CONNECT_DEVICE && <ConnectDeviceStep />}
			{step === Step.SETUP_NETWORK && <SetupNetworkStep />}
			{step === Step.SETUP_DEVICE && <SetupDeviceStep />}
		</Form>
	);
}
