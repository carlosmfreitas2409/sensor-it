import { getUserViaToken } from '@/lib/auth';

import { Bell } from '@sensor-it/ui/icons';

import { Button, Input } from '@sensor-it/ui/components';

import { UserDropdown } from './user-dropdown';

export async function Header() {
	const { user } = await getUserViaToken();

	return (
		<header className="w-full border-b py-3">
			<div className="flex h-full w-full items-center justify-between px-8">
				<div className="flex flex-col">
					<span className="text-xs">Bem-vindo(a),</span>
					<span className="font-medium text-sm">{user.name}</span>
				</div>

				<Input type="search" className="max-w-sm" placeholder="Pesquisar" />

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
