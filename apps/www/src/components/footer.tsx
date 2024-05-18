import { Github01Icon } from 'hugeicons-react';

import { GithubStars } from './github-stars';

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="container animate-footerFadeIn">
			<div className="flex flex-row-reverse flex-wrap items-center justify-between border-t-2 pt-4 pb-6">
				<div className="flex items-center justify-between gap-2 max-sm:mb-4 max-sm:w-full">
					<GithubStars />

					<a
						className="p-1 text-muted-foreground"
						href="https://git.new/sensor-it"
						target="_blank"
						rel="noreferrer"
					>
						<Github01Icon />
					</a>
				</div>

				<span className="text-secondary-foreground text-xs italic">
					page inspired by{' '}
					<a
						href="https://linear.app/mobile"
						target="_blank"
						className="text-indigo-600"
						rel="noreferrer"
					>
						Linear Mobile
					</a>
				</span>

				<span className="text-secondary-foreground text-sm">
					© {year} SensorIt
				</span>
			</div>
		</footer>
	);
}
