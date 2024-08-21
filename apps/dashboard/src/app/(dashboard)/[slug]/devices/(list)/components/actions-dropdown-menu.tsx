import { MoreHorizontal, PowerOff, Trash } from '@sensor-it/ui/icons';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@sensor-it/ui/components';

export function ActionsDropdownMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="size-8 p-0">
					<span className="sr-only">Abrir menu</span>
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuItem className="gap-2">
					<PowerOff className="size-4" />
					<span>Desativar</span>
				</DropdownMenuItem>

				<DropdownMenuItem className="gap-2 text-destructive">
					<Trash className="size-4" />
					<span>Deletar</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
