import type { LucideIcon } from '@sensor-it/ui/icons';

interface InfoCardProps {
	title: string;
	icon: LucideIcon;
	messages: string[];
}

export function InfoCard({ title, icon: Icon, messages }: InfoCardProps) {
	return (
		<div className="rounded-xl border p-2.5">
			<div className="flex items-center gap-2.5">
				<div className="flex size-9 items-center justify-center rounded-md border bg-white">
					<Icon />
				</div>
				<h6 className="font-medium">{title}</h6>
			</div>

			<div className="mt-2.5 flex flex-col gap-2">
				{messages.map((message, idx) => {
					return (
						<span
							key={idx}
							className="rounded-md border bg-white p-3 text-muted-foreground text-xs"
						>
							{message}
						</span>
					);
				})}
			</div>
		</div>
	);
}
