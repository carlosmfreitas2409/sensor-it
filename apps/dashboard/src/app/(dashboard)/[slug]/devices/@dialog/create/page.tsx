import { Dialog } from '@sensor-it/ui/components';

import { InterceptedDialogContent } from '@/components/intercepted-dialog-content';

import { DeviceManager } from './components/device-manager';
import { CreateDeviceForm } from './create-device-form';

export default function CreateDevice() {
	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<DeviceManager>
					<CreateDeviceForm />
				</DeviceManager>
			</InterceptedDialogContent>
		</Dialog>
	);
}
