import Link from 'next/link';
import Image from 'next/image';

import { getOrganizationSlug } from '@/lib/auth';

import { CirclePlay, PlusCircle } from '@sensor-it/ui/icons';

import { Button } from '@sensor-it/ui/components';

export function EmptyState() {
	const slug = getOrganizationSlug();

	return (
		<div className="flex w-full flex-col items-center justify-center rounded-lg border bg-white px-4 py-10">
			<Image
				src="/assets/machine.png"
				alt="Nenhuma máquina encontrada."
				width={398}
				height={212}
			/>

			<h3 className="mt-6 font-semibold text-lg">
				Dispositivos cadastrados irão aparecer aqui
			</h3>

			<p className="text-muted-foreground text-sm">
				Crie um novo dispositivo para começar a monitorar.
			</p>

			<div className="mt-6 flex gap-2">
				<Button variant="outline" asChild>
					<Link href="https://sensor.it/docs/how-to-create-a-device">
						<CirclePlay className="mr-2 size-4" />
						<span>Como funciona</span>
					</Link>
				</Button>

				<Button asChild>
					<Link href={`/${slug}/devices/create`}>
						<PlusCircle className="mr-2 size-4" />
						<span>Criar dispositivo</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
