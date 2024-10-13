import { Button } from '@sensor-it/ui/components';
import { SensorItMark } from '@sensor-it/ui/icons';
import Link from 'next/link';

export default function Welcome() {
	return (
		<div className="relative mx-auto mt-24 flex max-w-sm flex-col items-center px-3 text-center md:mt-32 md:px-8 lg:mt-48">
			<div className="fade-in-0 slide-in-from-bottom-20 relative flex w-auto animate-in items-center justify-center px-6 py-2 duration-700">
				<div className="absolute inset-0 opacity-10">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="repeat-infinite absolute inset-0 animate-pulse-scale rounded-full mix-blend-color-burn"
							style={{
								animationDelay: `${i * -2}s`,
								backgroundImage:
									'linear-gradient(90deg, #000, transparent, #000)',
							}}
						/>
					))}
				</div>

				<SensorItMark className="size-16" />
			</div>

			<h1 className="fade-in-0 slide-in-from-bottom-20 mt-10 animate-in font-semibold text-2xl text-gray-800 duration-700">
				Bem-vindo a SensorIt
			</h1>

			<p className="fade-in-0 slide-in-from-bottom-20 mt-3 animate-in text-gray-500 duration-700">
				A SensorIt oferece superpoderes para monitorar e analisar suas máquinas
				de forma mais inteligente.
			</p>

			<div className="fade-in-0 slide-in-from-bottom-20 mt-10 w-full animate-in duration-700">
				<Button className="w-full" asChild>
					<Link href="/onboarding/organization">Começar agora</Link>
				</Button>
			</div>
		</div>
	);
}
