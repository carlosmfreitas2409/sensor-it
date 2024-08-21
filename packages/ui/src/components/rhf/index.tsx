'use client';

import * as React from 'react';
import {
	Controller,
	type ControllerRenderProps,
	type FieldValues,
	FormProvider,
	useFormContext,
	type UseFormReturn,
} from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';

import { Label, Button } from '..';

import { cn } from '@sensor-it/utils';

type FormProps<T extends FieldValues> =
	React.ComponentPropsWithoutRef<'form'> & {
		methods: UseFormReturn<T>;
	};

function Form<T extends FieldValues>({ methods, ...formProps }: FormProps<T>) {
	return (
		<FormProvider {...methods}>
			<form {...formProps} />
		</FormProvider>
	);
}

type FormFieldContextValue = {
	id: string;
	name: string;
	field: ControllerRenderProps;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

function useFormField() {
	const fieldContext = React.useContext(FormFieldContext);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	return {
		formFieldId: fieldContext.id,
		name: fieldContext.name,
		field: fieldContext.field,
		...fieldState,
	};
}

type FormFieldProps = React.ComponentPropsWithoutRef<'div'> & {
	name: string;
	orientation?: 'horizontal' | 'vertical';
};

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
	(props, ref) => {
		const { name, className, orientation = 'vertical', ...fieldProps } = props;

		const { control } = useFormContext();

		const id = React.useId();

		return (
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => (
					<FormFieldContext.Provider value={{ id, name, field }}>
						<div
							ref={ref}
							data-invalid={!!fieldState.error}
							className={cn(
								orientation === 'horizontal'
									? 'flex items-center space-x-1.5'
									: 'space-y-1.5',
								className,
							)}
							{...fieldProps}
						/>
					</FormFieldContext.Provider>
				)}
			/>
		);
	},
);

FormField.displayName = 'FormField';

const FormLabel = React.forwardRef<
	React.ElementRef<typeof Label>,
	React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
	const { formFieldId, error } = useFormField();

	return (
		<Label
			ref={ref}
			htmlFor={formFieldId}
			data-invalid={!!error}
			className={cn(error && 'text-destructive', className)}
			{...props}
		/>
	);
});

FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => {
	const { formFieldId, error } = useFormField();

	return (
		<Slot
			ref={ref}
			id={formFieldId}
			aria-invalid={!!error}
			className={cn(
				error &&
					'border-destructive focus-visible:border-destructive/60 focus-visible:ring-destructive-ring',
				className,
			)}
			{...props}
		/>
	);
});

FormControl.displayName = 'FormControl';

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error } = useFormField();

	const body = error ? String(error.message) : children;

	if (!body) return null;

	return (
		<p
			ref={ref}
			className={cn(
				'text-muted-foreground text-sm leading-5',
				error && 'text-destructive',
				className,
			)}
			{...props}
		>
			{body}
		</p>
	);
});

FormMessage.displayName = 'FormMessage';

const FormSubmit = React.forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => {
	const { formState } = useFormContext();

	return (
		<Button
			ref={ref}
			type="submit"
			isLoading={formState.isSubmitting}
			{...props}
		/>
	);
});

FormSubmit.displayName = 'FormSubmit';

export {
	Form,
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
	FormSubmit,
	useFormField,
};
