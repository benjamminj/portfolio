import { CompileContext } from 'mdast-util-from-markdown/lib';
import { ReactNode, createElement } from 'react';
import { A } from './a';
import { cn } from './cn';
import { CodeBlock } from './code-block';
import { MarkdownService } from './markdown-service.server';

export async function Markdown({ raw }: { raw: string }) {
	const mdast = await MarkdownService.parseMarkdownToMdast(raw);

	if (!mdast) return null;

	return (
		<div className="text-@medium mx-auto max-w-prose">
			{/** @ts-expect-error JSX return type */}
			<InternalMarkdownRenderer nodes={mdast.data as CompileContext['stack']} />
		</div>
	);
}

function InternalMarkdownRenderer({ nodes = [] }: { nodes?: CompileContext['stack'] }) {
	return nodes.map((node) => {
		if (node.type === 'heading') {
			return (
				<Heading level={node.depth}>
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</Heading>
			);
		}

		if (node.type === 'text') {
			return node.value;
		}

		if (node.type === 'paragraph') {
			return (
				<p className="text-@medium mb-4">
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</p>
			);
		}

		if (node.type === 'link') {
			return (
				<A href={node.url}>
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</A>
			);
		}

		if (node.type === 'thematicBreak') {
			return (
				<hr className="relative h-auto my-16 font-mono tracking-tighter text-center border-none before:content-['*_*_*'] before:text-lg dark:text-gray-400" />
			);
		}

		if (node.type === 'strong') {
			return (
				<strong>
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</strong>
			);
		}

		if (node.type === 'emphasis') {
			return (
				<em>
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</em>
			);
		}

		if (node.type === 'list' && node.ordered) {
			return (
				<ol className="pl-8 [counter-reset:ol-count] marker:[counter-increment:ol-count] list-decimal">
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</ol>
			);
		}

		if (node.type === 'list' && !node.ordered) {
			return (
				<ul className="pl-4 list-disc [&_li::marker]:content-['●'] [&_li_li::marker]:content-['○'] [&_li]:pl-6">
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</ul>
			);
		}

		if (node.type === 'listItem') {
			return (
				<li className="relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute">
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</li>
			);
		}

		if (node.type === 'blockquote') {
			return (
				<blockquote className="p-4 mb-4 bg-@bg-muted text-@medium italic border-l-4 border-l-@border-muted [&_>_:last-child]:mb-0">
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</blockquote>
			);
		}

		if (node.type === 'inlineCode') {
			return (
				<code className="bg-@bg-muted text-@pink-700 dark:text-@pink-500 p-1 break-words before:content-['`'] before:font-bold before:text-@pink-700 dark:before:text-@pink-500 before:text-opacity-50 after:content-['`'] after:font-bold after:text-@pink-700 dark:after:text-@pink-500 after:text-opacity-50">
					{node.value}
				</code>
			);
		}

		if (node.type === 'code') {
			return <CodeBlock code={node.value} />;
		}

		if (node.type === 'image') {
			// TODO: next image??
			return <img src={node.url} alt={node.alt ?? ''} />;
		}

		if (node.type === 'table') {
			const [thead, ...tbody] = node.children;
			return (
				<table>
					<thead>
						{/** @ts-expect-error JSX return type */}
						<InternalMarkdownRenderer nodes={[thead]} />
					</thead>
					<tbody>
						{/** @ts-expect-error JSX return type */}
						<InternalMarkdownRenderer nodes={tbody} />
					</tbody>
				</table>
			);
		}

		if (node.type === 'tableRow') {
			return (
				<tr>
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</tr>
			);
		}

		if (node.type === 'tableCell') {
			return (
				<td>
					{/** @ts-expect-error JSX return type */}
					<InternalMarkdownRenderer nodes={node.children} />
				</td>
			);
		}

		return null;
	});
}

function Heading({ level = 2, children }: { level?: number; children: ReactNode }) {
	const tag = `h${Math.max(Math.min(level, 6), 1)}`;
	const styles = {
		h1: 'text-@h2 mb-6',
		h2: 'text-@h3 mb-4',
		h3: 'text-@h4 mb-4',
		h4: 'text-@h5 mb-4',
		h5: 'text-@h6 mb-4',
		h6: 'text-@h6 mb-4',
	};

	const headerStyle = styles[tag as unknown as keyof typeof styles];

	return createElement(tag, { className: cn(headerStyle, 'font-medium') }, children);
}
