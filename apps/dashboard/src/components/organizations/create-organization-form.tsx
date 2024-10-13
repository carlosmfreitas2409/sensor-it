'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { slugify } from '@sensor-it/utils';

import { createOrganization } from '@/services/organizations/create-organization';

import { useForm } from '@/hooks/use-form';

import {
	Form,
	FormField,
	FormInput,
	FormLabel,
	FormMessage,
	FormSubmit,
	InfoTooltip,
} from '@sensor-it/ui/components';

interface CreateOrganizationFormProps {
	onSuccess?: (data: CreateOrganizationFormData) => void;
}

type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;

const createOrganizationSchema = z.object({
	name: z.string().min(1, 'Por favor, insira o nome da organização.'),
	slug: z
		.string()
		.min(3, 'O slug deve ter no mínimo 3 caracteres.')
		.max(48, 'O slug deve ter no máximo 48 caracteres.')
		.regex(
			/^[a-zA-Z0-9\-]+$/,
			'O slug deve conter apenas letras, números e hifens.',
		),
});

export function CreateOrganizationForm({
	onSuccess,
}: CreateOrganizationFormProps) {
	const { mutateAsync: createOrganizationFn } = useMutation({
		mutationFn: createOrganization,
	});

	const [form, handleSubmit] = useForm<CreateOrganizationFormData>({
		schema: createOrganizationSchema,
		defaultValues: {
			name: '',
			slug: '',
		},
		onSubmit: async (data) => {
			try {
				await createOrganizationFn(data);

				onSuccess?.(data);
			} catch {
				toast.error('Ocorreu um erro ao criar a organização.');
			}
		},
	});

	return (
		<Form
			methods={form}
			onSubmit={handleSubmit}
			className="flex flex-col space-y-6"
		>
			<FormField name="name">
				<FormLabel>Nome da organização</FormLabel>
				<FormInput
					type="text"
					placeholder="Acme, Inc."
					autoComplete="off"
					onChange={(e) => {
						form.setValue('slug', slugify(e.target.value));
					}}
				/>
				<FormMessage />
			</FormField>

			<FormField name="slug">
				<div className="space-x-2">
					<FormLabel>Slug da organização</FormLabel>
					<InfoTooltip>
						Este é o slug exclusivo da sua organização na SensorIt
					</InfoTooltip>
				</div>

				<div className="flex">
					<span className="inline-flex items-center rounded-l-md border border-gray-300 border-r-0 bg-gray-50 px-5 text-gray-500 sm:text-sm">
						app.sensor.it
					</span>

					<FormInput
						type="text"
						placeholder="acme"
						autoComplete="off"
						className="rounded-l-none"
					/>
				</div>

				<FormMessage />
			</FormField>

			<FormSubmit>Criar organização</FormSubmit>
		</Form>
	);
}
