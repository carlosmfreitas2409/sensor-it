'use client';

import Link from 'next/link';
import { z } from 'zod';

import { signIn } from '@/lib/auth/actions';

import { useForm } from '@/hooks/use-form';

import { Google } from '@sensor-it/ui/icons';

import {
	Button,
	Form,
	FormField,
	FormLabel,
	FormInput,
	FormSubmit,
	FormMessage,
	FormCheckbox,
} from '@sensor-it/ui/components';

export type SignInFormData = z.infer<typeof signInSchema>;

const signInSchema = z.object({
	email: z.string().email('Por favor, insira um e-mail válido.'),
	password: z.string().min(1, 'Por favor, insira sua senha.'),
	remember: z.boolean().optional(),
});

export default function SignInPage() {
	const [form, handleSubmit] = useForm<SignInFormData>({
		onSubmit: onSubmit,
		schema: signInSchema,
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	});

	async function onSubmit(data: SignInFormData) {
		await signIn('credentials', data);
	}

	return (
		<>
			<div className="mb-8 space-y-2">
				<h1 className="font-bold text-3xl leading-8 tracking-tighter">
					Acesse sua conta
				</h1>

				<p className="text-lg text-muted-foreground leading-7 tracking-tight">
					Bem-vindo de volta! Insira suas informações.
				</p>
			</div>

			<Form
				methods={form}
				onSubmit={handleSubmit}
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col gap-5">
					<FormField name="email">
						<FormLabel>E-mail</FormLabel>
						<FormInput type="email" placeholder="Insira seu e-mail" />
						<FormMessage />
					</FormField>

					<FormField name="password">
						<FormLabel>Senha</FormLabel>
						<FormInput type="password" placeholder="Insira sua senha" />
						<FormMessage />
					</FormField>
				</div>

				<div className="flex items-center justify-between">
					<FormField name="remember" orientation="horizontal">
						<FormCheckbox />
						<FormLabel>Lembrar de mim</FormLabel>
						<FormMessage />
					</FormField>

					<Button variant="link" className="h-auto p-0 font-semibold" asChild>
						<Link href="/auth/forgot-password">Esqueceu sua senha?</Link>
					</Button>
				</div>

				<FormSubmit>Entrar</FormSubmit>
			</Form>

			<form className="mt-4 flex-1">
				<Button
					type="submit"
					formAction={() => signIn('google')}
					variant="outline"
					className="w-full"
				>
					<Google className="mr-2 size-4" />
					<span>Entrar com o Google</span>
				</Button>
			</form>

			<div className="mt-8 flex items-center justify-center gap-1 text-sm leading-5">
				<p className="text-muted-foreground">Não tem uma conta?</p>
				<Button variant="link" className="h-auto p-0 font-bold" asChild>
					<Link href="/auth/sign-up">Registre-se</Link>
				</Button>
			</div>
		</>
	);
}
