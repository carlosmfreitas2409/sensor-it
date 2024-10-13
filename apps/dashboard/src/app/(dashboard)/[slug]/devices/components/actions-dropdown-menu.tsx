import { MoreHorizontal, PowerOff, Trash } from '@sensor-it/ui/icons';

import {
	AlertDialog,
	AlertDialogTrigger,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@sensor-it/ui/components';

import { DeleteAlertDialog } from './delete-alert-dialog';

interface ActionsDropdownMenuProps {
	deviceId: string;
}

export function ActionsDropdownMenu({ deviceId }: ActionsDropdownMenuProps) {
	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="size-8">
						<span className="sr-only">Abrir menu</span>
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem className="gap-2">
						<PowerOff className="size-4" />
						<span>Desativar</span>
					</DropdownMenuItem>

					<AlertDialogTrigger asChild>
						<DropdownMenuItem className="gap-2 text-destructive focus:text-destructive/80">
							<Trash className="size-4" />
							<span>Deletar</span>
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteAlertDialog deviceId={deviceId} />
		</AlertDialog>
	);
}
