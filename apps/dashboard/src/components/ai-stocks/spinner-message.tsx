import { Loader, OpenAIMark } from '@sensor-it/ui/icons';

export function SpinnerMessage() {
	return (
		<div className="relative flex items-start">
			<div className="flex size-7 items-center justify-center rounded-md border bg-white shadow-sm">
				<OpenAIMark />
			</div>

			<div className="ml-4 flex-1">
				<p className="font-medium">SensorIt Chat</p>
				<div className="mt-1 overflow-hidden font-base text-muted-foreground">
					<Loader className="size-4 animate-spin" />
				</div>
			</div>
		</div>
	);
}
