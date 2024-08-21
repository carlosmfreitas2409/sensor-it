import { ArrowLeft, ArrowRight, Logo } from '@sensor-it/ui/icons';

import { Button } from '@sensor-it/ui/components';

export default function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
			<div className="relative m-4 mr-0 hidden items-end overflow-hidden rounded-2xl border bg-[#E3D9CD] bg-[url('/assets/auth.png')] bg-center bg-cover bg-no-repeat shadow-md lg:flex 2xl:col-span-2">
				<div className="absolute inset-0 bg-gradient-to-t from-black/50" />

				<div className="z-10 flex flex-col gap-8 border-white border-t bg-white/30 p-8 text-white backdrop-blur-sm">
					<p className="font-normal text-3xl leading-8">
						”A SensorIt nos poupou milhares de horas de trabalho. Agora somos
						capazes de finalizar projetos com mais rapidez e atender a mais
						clientes.”
					</p>

					<div className="flex items-end justify-between">
						<div>
							<h1 className="font-semibold text-3xl leading-8">John Doe</h1>
							<p className="mt-2 font-medium text-lg">Engenheiro automotivo</p>
							<p>Scania</p>
						</div>

						<div className="space-x-4">
							<Button
								size="icon"
								variant="ghost"
								className="size-12 rounded-full border border-white"
							>
								<ArrowLeft />
							</Button>

							<Button
								size="icon"
								variant="ghost"
								className="size-12 rounded-full border border-white"
							>
								<ArrowRight />
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center p-4 lg:max-w-3xl">
				<div className="flex w-full max-w-md flex-col">
					<div className="mb-16">
						<Logo />
					</div>

					{children}
				</div>
			</div>
		</div>
	);
}
