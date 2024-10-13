import { Dialog } from '@sensor-it/ui/components';

import { InterceptedDialogContent } from '@/components/intercepted-dialog-content';

import { DeviceProvider } from './components/device-provider';

import { CreateDeviceForm } from './create-device-form';

export default function CreateDevice() {
	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<DeviceProvider>
					<CreateDeviceForm />
				</DeviceProvider>
			</InterceptedDialogContent>
		</Dialog>
	);
}
