import { getUserViaToken } from '@/lib/auth';

import { Bell } from '@sensor-it/ui/icons';

import { Button, Input } from '@sensor-it/ui/components';

import { UserDropdown } from './user-dropdown';

export async function Header() {
	const { user } = await getUserViaToken();

	return (
		<header className="w-full border-b py-3">
			<div className="container flex h-full max-w-full items-center justify-between">
				<div className="flex flex-col">
					<span className="text-xs">Bem-vindo(a),</span>
					<span className="font-medium text-sm">{user.name}</span>
				</div>

				<Input
					type="search"
					className="hidden max-w-sm md:flex"
					placeholder="Pesquisar"
					autoComplete="off"
				/>

				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon">
						<Bell className="size-5 text-muted-foreground" />
					</Button>

					<UserDropdown user={user} />
				</div>
			</div>
		</header>
	);
}
