import { useEffect, useState } from 'react';
import { type StreamableValue, readStreamableValue } from 'ai/rsc';

export function useStreamableText(content: string | StreamableValue<string>) {
	const [rawContent, setRawContent] = useState(
		typeof content === 'string' ? content : '',
	);

	useEffect(() => {
		(async () => {
			if (typeof content === 'object') {
				const value = '';
				for await (const delta of readStreamableValue(content)) {
					if (typeof delta === 'string') {
						const newValue = value + delta;
						setRawContent(newValue);
					}
				}
			}
		})();
	}, [content]);

	return rawContent;
}
