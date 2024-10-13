import { type FC, memo } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { cn } from '@sensor-it/utils';

function Markdown({ className, ...props }: Options) {
	return (
		<ReactMarkdown
			className={cn(
				'prose dark:prose-invert break-words prose-pre:p-0 prose-p:leading-relaxed',
				className,
			)}
			remarkPlugins={[remarkGfm, remarkMath]}
			components={{
				p({ children }) {
					return <p className="mb-2 last:mb-0">{children}</p>;
				},
				a: ({ children, ...props }) => {
					return (
						<a className="text-primary hover:underline" {...props}>
							{children}
						</a>
					);
				},
				strong: ({ children, ...props }) => {
					return (
						<span className="font-semibold" {...props}>
							{children}
						</span>
					);
				},
				ol: ({ children, ...props }) => {
					return (
						<ol className="list-inside list-decimal" {...props}>
							{children}
						</ol>
					);
				},
				li: ({ children, ...props }) => {
					return (
						<li className="py-1" {...props}>
							{children}
						</li>
					);
				},
				ul: ({ children, ...props }) => {
					return (
						<ul className="list-inside list-decimal" {...props}>
							{children}
						</ul>
					);
				},
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				// code: ({ inline, className, children, ...props }: any) => {
				// 	const match = /language-(\w+)/.exec(className || '');
				// 	return !inline && match ? (
				// 		<pre
				// 			{...props}
				// 			className={`${className} mt-2 w-[80dvw] overflow-x-scroll rounded bg-zinc-100 p-2 text-sm md:max-w-[500px] dark:bg-zinc-800`}
				// 		>
				// 			<code className={match[1]}>{children}</code>
				// 		</pre>
				// 	) : (
				// 		<code
				// 			className={`${className} rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-800`}
				// 			{...props}
				// 		>
				// 			{children}
				// 		</code>
				// 	);
				// },
			}}
			{...props}
		/>
	);
}

export const MemoizedReactMarkdown: FC<Options> = memo(
	Markdown,
	(prevProps, nextProps) =>
		prevProps.children === nextProps.children &&
		prevProps.className === nextProps.className,
);
