import {
	useForm as useFormRHF,
	type FieldValues,
	type FormState,
	type UseFormHandleSubmit,
	type UseFormReturn,
	type UseFormProps as UseFormPropsRHF,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import type { z } from 'zod';

type UseFormProps<FormData extends FieldValues> = Omit<
	UseFormPropsRHF<FormData>,
	'resolver'
> & {
	schema: z.Schema;
	onSubmit: (data: FormData) => void | Promise<void>;
};

type UseFormOutput<FormData extends FieldValues> = [
	UseFormReturn<FormData>,
	ReturnType<UseFormHandleSubmit<FormData>>,
	FormState<FormData>,
];

export function useForm<FormData extends FieldValues>({
	schema,
	onSubmit,
	...formProps
}: UseFormProps<FormData>): UseFormOutput<FormData> {
	const form = useFormRHF<FormData>({
		resolver: zodResolver(schema),
		...formProps,
	});

	return [form, form.handleSubmit(onSubmit), form.formState];
}
