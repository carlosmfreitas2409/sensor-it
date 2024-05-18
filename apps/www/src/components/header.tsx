import { LogoIcon } from '@/assets/logo-icon';
import { ArrowRight01Icon } from 'hugeicons-react';

export function Header() {
	return (
		<header className="container">
			<div className="flex h-12 items-center justify-between border-b-2">
				<div>
					<LogoIcon height={24} />
				</div>

				<a
					href="#app"
					className="flex h-8 items-center justify-center rounded-lg border bg-secondary px-3 font-medium text-secondary-foreground text-sm"
				>
					Open app
					<ArrowRight01Icon className="ml-1 h-4 w-4" />
				</a>
			</div>
		</header>
	);
}
