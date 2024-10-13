import type { User } from '@/entities/user';

import { AvatarWithFallback } from '@/components/avatar-fallback';

interface UserMessageProps {
	author: User;
	children: React.ReactNode;
}

export function UserMessage({ author, children }: UserMessageProps) {
	return (
		<div className="relative flex flex-row-reverse items-start">
			<AvatarWithFallback
				src={author.avatarUrl}
				alt={author.name}
				className="size-7 rounded-md"
			/>

			<div className="mr-2 flex flex-col items-end rounded-lg bg-chat px-4 py-2">
				<div className="overflow-hidden font-normal text-base text-chat-foreground">
					{children}
				</div>
			</div>
		</div>
	);
}
