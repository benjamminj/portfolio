import type { HtmlAstNode } from '@/lib/hast.types';
import { ReactNode, createElement } from 'react';
import { cn } from './cn';
import { CodeBlock } from './code-block';
import { MarkdownService } from './markdown-service.server';
import { A } from './a';

export async function Markdown({ raw }: { raw: string }) {
	const hast = await MarkdownService.parseMarkdownToHast(raw);

	if (!hast) return null;

	return (
		<div className="prose dark:prose-invert font-mono mx-auto max-w-prose">
			<InternalMarkdownRenderer nodes={hast.children as HtmlAstNode[]} />
		</div>
	);
}

function InternalMarkdownRenderer({ nodes = [] }: { nodes?: HtmlAstNode[] }) {
	return nodes.map((node, i) => {
		if (node.type === 'heading') {
			return (
				<Heading level={node.depth}>
					<InternalMarkdownRenderer nodes={node.children} />
				</Heading>
			);
		}

		if (node.type === 'text') {
			return node.value;
		}

		if (node.type === 'paragraph') {
			return (
				<p className="mb-6 text-base leading-7">
					<InternalMarkdownRenderer nodes={node.children} />
				</p>
			);
		}

		if (node.type === 'link') {
			return (
				<A href={node.url}>
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
					<InternalMarkdownRenderer nodes={node.children} />
				</strong>
			);
		}

		if (node.type === 'emphasis') {
			return (
				<em>
					<InternalMarkdownRenderer nodes={node.children} />
				</em>
			);
		}

		if (node.type === 'list' && node.ordered) {
			return (
				<ol className="pl-8 list-none">
					<InternalMarkdownRenderer nodes={node.children} />
				</ol>
			);
		}

		if (node.type === 'list' && !node.ordered) {
			return (
				<ul className="pl-8 list-none">
					<InternalMarkdownRenderer nodes={node.children} />
				</ul>
			);
		}

		if (node.type === 'listItem') {
			return (
				<li className="relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute">
					<InternalMarkdownRenderer nodes={node.children} />
				</li>
			);
		}

		if (node.type === 'blockquote') {
			return (
				<blockquote>
					<InternalMarkdownRenderer nodes={node.children} />
				</blockquote>
			);
		}

		if (node.type === 'inlineCode') {
			return <code className="bg-gray-100 dark:bg-gray-700 p-1 break-words">{node.value}</code>;
		}

		if (node.type === 'code') {
			return <CodeBlock code={node.value} />;
		}

		if (node.type === 'image') {
			// TODO: next image??
			return <img src={node.url} alt={node.alt} />;
		}

		return null;
	});
}

function Heading({ level = 2, children }: { level?: number; children: ReactNode }) {
	const tag = `h${Math.max(Math.min(level, 6), 1)}`;
	const styles = {
		h1: '',
		h2: 'mt-16 mb-6 text-3xl',
		h3: 'mt-12 mb-4 text-2xl',
		h4: 'mt-10 mb-4 text-xl',
		h5: 'mt-6 mb-4 text-lg',
		h6: 'mt-6 mb-4 text-base'
	};

	const headerStyle = styles[tag as unknown as keyof typeof styles];

	return createElement(tag, { className: cn(headerStyle, 'font-medium') }, children);
}
