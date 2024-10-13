'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteDevice } from '@/services/devices/delete-device';
import type { ListDevicesResponse } from '@/services/devices/list-devices';

import { useOrganizationSlug } from '@/hooks/use-organization-slug';

import {
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
	Button,
} from '@sensor-it/ui/components';

import { revalidateDevices } from '../actions';

interface DeleteAlertDialogProps {
	deviceId: string;
}

export function DeleteAlertDialog({ deviceId }: DeleteAlertDialogProps) {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteDevice,
		onSuccess: (_, { deviceId }) => {
			const devicesCache = queryClient.getQueriesData<ListDevicesResponse>({
				queryKey: ['devices'],
			});

			for (const [cacheKey, cached] of devicesCache) {
				if (!cached) return;

				queryClient.setQueryData<ListDevicesResponse>(
					cacheKey,
					cached.filter((data) => data.id !== deviceId),
				);
			}

			revalidateDevices();

			toast.success('Dispositivo deletado com sucesso!');
		},
	});

	const slug = useOrganizationSlug();

	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Deletar dispositivo</AlertDialogTitle>
				<AlertDialogDescription>
					Você tem certeza que deseja deletar este dispositivo? Esta ação não
					pode ser desfeita.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancelar</AlertDialogCancel>

				<Button variant="destructive" asChild>
					<AlertDialogAction
						onClick={() => {
							mutate({
								deviceId,
								slug: slug || '',
							});
						}}
					>
						Deletar
					</AlertDialogAction>
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}
