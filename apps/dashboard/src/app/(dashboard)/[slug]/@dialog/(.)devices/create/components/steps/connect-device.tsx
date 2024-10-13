import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { type IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

import Rive from '@rive-app/react-canvas-lite';

import {
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@sensor-it/ui/components';

import { useDevice } from '../device-provider';

import { type CreateDeviceFormData, Step } from '../../schema';

interface QrCodeData {
	name: string;
	model: string;
	serialNumber: string;
}

export function ConnectDeviceStep() {
	const form = useFormContext<CreateDeviceFormData>();

	const { setDevice, connectToDevice } = useDevice();

	const [isLoading, setIsLoading] = useState(false);

	async function onScanCode(codes: IDetectedBarcode[]) {
		setIsLoading(true);

		const { name, model, serialNumber } = JSON.parse(
			codes[0]?.rawValue || '',
		) as QrCodeData;

		if (!name || !model || !serialNumber) return;

		try {
			const device = await connectToDevice(name);

			if (!device) {
				throw new Error('Device not found');
			}

			setDevice(device);

			form.setValue('step', Step.SETUP_NETWORK);
			form.setValue('model', model);
			form.setValue('serialNumber', serialNumber);
		} catch (err) {
			console.log(err);
			toast.error(
				'Não foi possível conectar ao dispositivo. Por-favor, tente novamente.',
			);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<div className="flex flex-col items-center gap-2">
				<Rive src="/rives/scanning.riv" className="size-32" />

				<DialogTitle>Estamos navegando até seu dispositivo...</DialogTitle>
				<DialogDescription className="text-center text-foreground">
					<span>
						Por favor, selecione o dispositivo quando solicitado. Caso nenhum
						dispositivo apareça,{' '}
					</span>
					<button type="button" className="text-primary hover:text-primary/80">
						clique aqui
					</button>
					<span> para tentar novamente.</span>
				</DialogDescription>

				<span className="text-sm">O processo pode levar alguns segundos.</span>
			</div>
		);
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Conectar dispositivo</DialogTitle>
				<DialogDescription>
					Escanei o QR Code que está em seu dispositivo.
				</DialogDescription>
			</DialogHeader>

			<div className="mt-2 flex flex-col items-center justify-center">
				<div className="h-96 max-w-96 overflow-hidden rounded-2xl">
					<Scanner
						formats={['qr_code']}
						allowMultiple={false}
						paused={isLoading}
						onScan={onScanCode}
						components={{
							finder: false,
						}}
					>
						<div className="relative">
							<svg viewBox="0 0 384 384" className="top-0 left-0 box-border">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M384 0H0V384H384V0ZM76 45C50.5 45 45 50.5 45 73V308.5C45 331.5 50 339 77 339H304C333.5 339 339 331 339 304.5V73.5C339 52 333 45 311 45H76Z"
									fill="rgba(0, 0, 0, 0.5)"
								/>
								<path
									d="M29.0089 59.2698C28.9721 60.1326 30.7069 60.3482 30.7691 59.2698C30.5907 42.1425 41.3122 30.8127 58.9528 30.8127C60.4929 30.8127 60.1974 29.0885 58.9528 29.0342C40.9915 28.2504 28.6199 41.0139 29.0089 59.2698Z"
									fill="white"
								/>
								<path
									d="M353.991 59.2698C354.028 60.1326 352.293 60.3482 352.231 59.2698C352.409 42.1425 341.688 30.8127 324.047 30.8127C322.507 30.8127 322.803 29.0885 324.047 29.0342C342.008 28.2504 354.38 41.0139 353.991 59.2698Z"
									fill="white"
								/>
								<path
									d="M29.0089 323.73C28.9721 322.867 30.7069 322.652 30.7691 323.73C30.5907 340.858 41.3122 352.187 58.9528 352.187C60.4929 352.187 60.1974 353.911 58.9528 353.966C40.9915 354.75 28.6199 341.986 29.0089 323.73Z"
									fill="white"
								/>
								<path
									d="M353.991 323.73C354.028 322.867 352.293 322.652 352.231 323.73C352.409 340.858 341.688 352.187 324.047 352.187C322.507 352.187 322.803 353.911 324.047 353.966C342.008 354.75 354.38 341.986 353.991 323.73Z"
									fill="white"
								/>
							</svg>
						</div>
					</Scanner>
				</div>
			</div>
		</>
	);
}
