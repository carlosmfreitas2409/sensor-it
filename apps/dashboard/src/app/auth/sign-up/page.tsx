'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { signUp } from '@/services/users/sign-up';

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
} from '@sensor-it/ui/components';

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signUpSchema = z
	.object({
		name: z.string().refine((value) => value.split(' ').length > 1, {
			message: 'Por favor, insira seu nome completo.',
		}),
		email: z.string().email('Por favor, insira um e-mail válido.'),
		password: z.string().min(6, 'Por favor, insira sua senha.'),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'As senhas não coincidem.',
		path: ['passwordConfirmation'],
	});

export default function SignInPage() {
	const router = useRouter();

	const { mutateAsync } = useMutation({
		mutationFn: signUp,
	});

	const [form, handleSubmit] = useForm<SignUpFormData>({
		onSubmit: onSubmit,
		schema: signUpSchema,
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: '',
		},
	});

	async function onSubmit(data: SignUpFormData) {
		await mutateAsync(data);

		router.push('/');

		toast.success('Conta criada com sucesso!');
	}

	return (
		<>
			<div className="mb-8 space-y-2">
				<h1 className="font-bold text-3xl leading-8 tracking-tighter">
					Cadastre-se gratuitamente
				</h1>

				<p className="text-lg text-muted-foreground leading-7 tracking-tight">
					Comece seu período de avaliação gratuita.
				</p>
			</div>

			<Form
				methods={form}
				onSubmit={handleSubmit}
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col gap-5">
					<FormField name="name">
						<FormLabel>Nome</FormLabel>
						<FormInput
							autoComplete="name"
							placeholder="Insira seu nome completo"
						/>
						<FormMessage />
					</FormField>

					<FormField name="email">
						<FormLabel>E-mail</FormLabel>
						<FormInput type="email" placeholder="Insira seu e-mail" />
						<FormMessage />
					</FormField>

					<FormField name="password">
						<FormLabel>Senha</FormLabel>
						<FormInput type="password" placeholder="Insira sua senha" />
						<FormMessage>Deve ter no mínimo 7 caracteres.</FormMessage>
					</FormField>

					<FormField name="passwordConfirmation">
						<FormLabel>Confirme sua senha</FormLabel>
						<FormInput type="password" placeholder="Confirme sua senha" />
						<FormMessage />
					</FormField>
				</div>

				<p className="text-sm leading-5">
					Ao se cadastrar, você aceita nossos{' '}
					<Button variant="link" size="link" asChild>
						<Link href="#">termos de uso</Link>
					</Button>{' '}
					e a nossa{' '}
					<Button variant="link" size="link" asChild>
						<Link href="#">política de privacidade</Link>
					</Button>
					.
				</p>

				<FormSubmit>Começar já</FormSubmit>
			</Form>

			<form className="mt-4 flex-1">
				<Button
					type="submit"
					formAction={() => signIn('google')}
					variant="outline"
					className="w-full"
				>
					<Google className="mr-2 size-4" />
					<span>Registre-se com o Google</span>
				</Button>
			</form>

			<div className="mt-8 flex items-center justify-center gap-1 text-sm leading-5">
				<p className="text-muted-foreground">Já possui uma conta?</p>
				<Button
					variant="link"
					size="link"
					className="h-auto p-0 font-bold"
					asChild
				>
					<Link href="/auth/sign-in">Entre na plataforma</Link>
				</Button>
			</div>
		</>
	);
}
