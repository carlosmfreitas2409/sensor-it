'use client';

import type { StreamableValue } from 'ai/rsc';

import { OpenAIMark } from '@sensor-it/ui/icons';

import { MemoizedReactMarkdown } from '@sensor-it/ui/components';
import { useStreamableText } from '@/hooks/use-streamable-text';

interface AssistantMessageProps {
	content: string | StreamableValue<string>;
}

export function AssistantMessage({ content }: AssistantMessageProps) {
	const text = useStreamableText(content);

	return (
		<div className="relative flex items-start">
			<div className="flex size-7 items-center justify-center rounded-md border bg-white shadow-sm">
				<OpenAIMark />
			</div>

			<div className="ml-4 flex-1">
				<p className="font-medium">SensorChat</p>
				<div className="mt-1 overflow-hidden">
					<MemoizedReactMarkdown className="text-muted-foreground">
						{text}
					</MemoizedReactMarkdown>
				</div>
			</div>
		</div>
	);
}
