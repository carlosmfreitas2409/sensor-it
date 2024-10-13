'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAIState, useUIState } from 'ai/rsc';

import type { AI } from '@/lib/ai/provider';

import { ScrollArea } from '@sensor-it/ui/components';

import { EmptyScreen } from './empty-screen';

export function ChatList() {
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	const router = useRouter();

	const [messages] = useUIState<AI>();
	const [aiState] = useAIState<AI>();

	useEffect(() => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
		}
	}, []);

	useEffect(() => {
		const totalMessages = aiState.messages?.length;
		if (totalMessages === 2) {
			router.refresh();
		}
	}, [aiState.messages, router]);

	if (!messages.length) {
		return <EmptyScreen />;
	}

	return (
		<ScrollArea
			ref={scrollAreaRef}
			type="always"
			className="w-full"
			viewportClassName="pb-9 pt-6"
		>
			<div className="relative mx-auto max-w-3xl px-4">
				{messages.map((message) => (
					<article key={message.id} className="py-5">
						{message.display}
					</article>
				))}
			</div>
		</ScrollArea>
	);
}
