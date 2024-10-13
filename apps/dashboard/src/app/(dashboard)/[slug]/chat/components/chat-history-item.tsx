'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { cn } from '@sensor-it/utils';

import type { Chat } from '@/entities/chat';

import { Button } from '@sensor-it/ui/components';

import { useChat } from '../contexts/chat-provider';

interface ChatHistoryItemProps {
	index: number;
	chat: Chat;
	slug: string | null;
}

export function ChatHistoryItem({ index, chat, slug }: ChatHistoryItemProps) {
	const pathname = usePathname();

	const { activeChatId, setActiveChatId } = useChat();

	const chatPath = `/${slug}/chat/${chat.id}`;

	const isActive = pathname === chatPath;

	const shouldAnimate = index === 0 && isActive && activeChatId;

	return (
		<motion.li
			key={chat.id}
			className="w-full"
			variants={{
				initial: { height: 0, opacity: 0 },
				animate: { height: 'auto', opacity: 1 },
			}}
			initial={shouldAnimate ? 'initial' : undefined}
			animate={shouldAnimate ? 'animate' : undefined}
			transition={{
				duration: 0.25,
				ease: 'easeIn',
			}}
		>
			<Button
				variant="ghost"
				size="sm"
				className={cn(
					'w-full max-w-[275px] cursor-pointer justify-start text-muted-foreground',
					isActive && 'bg-accent text-accent-foreground',
				)}
				asChild
			>
				<Link href={chatPath}>
					<span className="truncate whitespace-nowrap">
						{shouldAnimate ? (
							chat.title.split('').map((character, index) => (
								<motion.span
									key={index}
									initial={{ opacity: 0, x: -100 }}
									animate={{ opacity: 1 }}
									transition={{
										duration: 0.25,
										ease: 'easeIn',
										delay: index * 0.05,
										staggerChildren: 0.05,
									}}
									onAnimationComplete={() => {
										if (index === chat.title.length - 1) {
											setActiveChatId(null);
										}
									}}
								>
									{character}
								</motion.span>
							))
						) : (
							<span>{chat.title}</span>
						)}
					</span>
				</Link>
			</Button>
		</motion.li>
	);
}
