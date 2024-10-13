import { Suspense } from 'react';

import { Skeleton } from '@sensor-it/ui/components';

import { ModelSelector } from './model-selector';
import { ChatHistory } from './chat-history';

export function ChatSidebar() {
	return (
		<div className="flex h-full w-full max-w-[300px] flex-col gap-5 border-l bg-white py-4">
			<div className="mx-3">
				<ModelSelector />
			</div>

			<Suspense
				fallback={
					<div className="mx-3 flex flex-1 flex-col space-y-4 overflow-auto">
						{Array.from({ length: 10 }).map((_, i) => (
							<Skeleton key={i} className="h-7 w-full" />
						))}
					</div>
				}
			>
				<ChatHistory />
			</Suspense>
		</div>
	);
}
