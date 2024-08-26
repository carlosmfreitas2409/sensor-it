import { useFormContext } from 'react-hook-form';

import { QrCodeReader } from '@sensor-it/ui/icons';

import {
	Button,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@sensor-it/ui/components';

import { type CreateDeviceFormData, Step } from '../../schema';

export type Platform = 'desktop' | 'mobile';

export function ChangePlatformStep() {
	const form = useFormContext<CreateDeviceFormData>();

	function onChangePlatform(platform: Platform) {
		const newStep = {
			desktop: Step.CONNECT_DEVICE,
			mobile: Step.SMARTPHONE_AUTHENTICATION,
		}[platform];

		form.setValue('step', newStep);
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Novo dispositivo</DialogTitle>
				<DialogDescription>
					Adicione seu dispositivo à plataforma seguindo as instruções.
				</DialogDescription>
			</DialogHeader>

			<div className="space-y-4">
				<div className="flex flex-col items-center gap-2">
					<QrCodeReader className="h-60" />

					<p className="max-w-sm text-center font-light text-sm">
						Recomendamos utilizar o smartphone para escanear o QR Code e
						facilitar o cadastro do dispositivo. Isso garantirá uma experiência
						mais rápida e fluida.
					</p>
				</div>

				<div className="flex flex-col-reverse sm:flex-row sm:space-x-2">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => onChangePlatform('desktop')}
					>
						Continuar no computador
					</Button>

					<Button className="flex-1" onClick={() => onChangePlatform('mobile')}>
						Transferir para o smartphone
					</Button>
				</div>
			</div>
		</>
	);
}
