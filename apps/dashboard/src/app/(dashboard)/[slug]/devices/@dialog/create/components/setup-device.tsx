import { useQuery } from '@tanstack/react-query';

import { DICEBEAR_AVATAR_URL } from '@sensor-it/utils/constants';

import { listMembers } from '@/services/members/list-members';
import { useOrganization } from '@/hooks/use-organization';

import {
	DialogTitle,
	DialogHeader,
	DialogDescription,
	FormField,
	FormLabel,
	FormInput,
	FormSelect,
	SelectItem,
	Avatar,
	AvatarImage,
	FormSubmit,
} from '@sensor-it/ui/components';

export function SetupDeviceStep() {
	const slug = useOrganization();

	const { data: members } = useQuery({
		queryKey: ['members'],
		queryFn: () => listMembers(String(slug)),
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Configure seu dispositivo</DialogTitle>
				<DialogDescription>
					Preencha os campos abaixo para configurar seu dispositivo.
				</DialogDescription>
			</DialogHeader>

			<div className="grid grid-cols-2 gap-4">
				<FormField name="name" className="col-span-2">
					<FormLabel>Nome</FormLabel>
					<FormInput placeholder="Insira um nome para o dispositivo" />
				</FormField>

				<FormField name="machine">
					<FormLabel>Máquina</FormLabel>
					<FormInput placeholder="Insira o nome da máquina" />
				</FormField>

				<FormField name="assigneeId">
					<FormLabel>Responsável</FormLabel>
					<FormSelect placeholder="Selecione um responsável...">
						{members?.map((member) => (
							<SelectItem key={member.userId} value={member.userId}>
								<div className="flex flex-row items-center gap-2">
									<Avatar className="size-4">
										<AvatarImage
											src={
												member.avatarUrl ||
												`${DICEBEAR_AVATAR_URL}${member.name}`
											}
										/>
									</Avatar>
									<span>{member.name}</span>
								</div>
							</SelectItem>
						))}
					</FormSelect>
				</FormField>

				<FormField name="model">
					<FormLabel>Modelo</FormLabel>
					<FormInput disabled />
				</FormField>

				<FormField name="serialNumber">
					<FormLabel>Número de série</FormLabel>
					<FormInput disabled />
				</FormField>

				<FormSubmit className="col-span-2 ml-auto">Adicionar</FormSubmit>
			</div>
		</>
	);
}
