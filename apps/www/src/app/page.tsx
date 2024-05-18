import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<Header />

			<main className="flex flex-1 px-8 pt-6 pb-12">
				<div className="container flex flex-1">
					<div className="my-auto w-min space-y-2">
						<h1 className="text-center font-normal text-6xl uppercase tracking-tighter">
							<span>Sensor.It</span>
							<br />
							<span className="animate-titleFlick">Coming</span>
						</h1>

						<div className="flex animate-versionPulse items-center justify-center rounded-lg bg-secondary p-2 text-2xl text-secondary-foreground leading-normal">
							v0.1
						</div>

						<p className="animate-descFlick text-justify text-secondary-foreground text-xs leading-snug delay-[1.2s]">
							SensorIt is an application that is being developed{' '}
							<b>for a hackathon</b> and is a open-source project. You can
							follow the progress on GitHub. 😁
						</p>
					</div>

					<div className="flex animate-heroFadeIn justify-center">
						<img src="./hero.png" alt="Dashboard mockup" />
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
