import { Fragment, type ReactNode, createElement } from "react";
import { A } from "./a";
import { cn } from "./cn";
import { CodeBlock } from "./code-block";
import { MarkdownService } from "./markdown-service.server";
import type { CompileContext } from "mdast-util-from-markdown";
import { H } from "./h";
import { Callout } from "./callout";

type MarkdownProps = {
	raw: string;
	/** @deprecated — for migration only, then remove and make default */
	__flushEdges?: boolean;
};

export async function Markdown({ raw, __flushEdges = false }: MarkdownProps) {
	const mdast = await MarkdownService.parseMarkdownToMdast(raw);

	if (!mdast) return null;

	return (
		<div
			className={cn(
				"text-body mx-auto max-w-prose px-4 space-y-line",
				__flushEdges && "px-0 mx-0",
			)}
		>
			<InternalMarkdownRenderer nodes={mdast.data as CompileContext["stack"]} />
		</div>
	);
}

function InternalMarkdownRenderer({
	nodes = [],
}: { nodes?: CompileContext["stack"] }) {
	return nodes.map((node, i) => {
		// biome-ignore lint/suspicious/noArrayIndexKey: non-dynamic array ordering. safe to use index.
		return <MarkdownRendererNode node={node} key={i} />;
	});
}

function MarkdownRendererNode({
	node,
}: { node: CompileContext["stack"][number] }) {
	if (node.type === "heading") {
		return (
			<H level={node.depth} className="mb-line mt-line-2">
				<InternalMarkdownRenderer nodes={node.children} />
			</H>
		);
	}

	if (node.type === "text") {
		return node.value;
	}

	if (node.type === "paragraph") {
		return (
			<p>
				<InternalMarkdownRenderer nodes={node.children} />
			</p>
		);
	}

	if (node.type === "link") {
		return (
			<A href={node.url}>
				<InternalMarkdownRenderer nodes={node.children} />
			</A>
		);
	}

	if (node.type === "thematicBreak") {
		return (
			<hr className="relative h-auto my-line-2 text-center text-fg-muted border-none before:content-['*_*_*'] before:text-heading" />
		);
	}

	if (node.type === "break") {
		return <br />;
	}

	if (node.type === "strong") {
		return (
			<strong>
				<InternalMarkdownRenderer nodes={node.children} />
			</strong>
		);
	}

	if (node.type === "html") {
		// TODO: sanitize html for future usage if + when content is moved out of build step
		// biome-ignore lint/security/noDangerouslySetInnerHtml: markdown here is trusted source and at build time
		return <div dangerouslySetInnerHTML={{ __html: node.value }} />;
	}

	if (node.type === "emphasis") {
		return (
			<em>
				<InternalMarkdownRenderer nodes={node.children} />
			</em>
		);
	}

	if (node.type === "list" && node.ordered) {
		return (
			<ol className="my-line list-decimal [&_ol]:list-[lower-alpha] pl-7 space-y-line">
				<InternalMarkdownRenderer nodes={node.children} />
			</ol>
		);
	}

	if (node.type === "list" && !node.ordered) {
		return (
			<ul className="my-line list-disc [&_ul]:list-[circle] pl-5 [&_li]:pl-2 space-y-line">
				<InternalMarkdownRenderer nodes={node.children} />
			</ul>
		);
	}

	if (node.type === "listItem") {
		return (
			<li className="">
				<InternalMarkdownRenderer nodes={node.children} />
			</li>
		);
	}

	if (node.type === "blockquote") {
		const calloutMatches = [
			"NOTE",
			"TIP",
			"IMPORTANT",
			"WARNING",
			"CAUTION",
		] as const;
		type CalloutType = (typeof calloutMatches)[number];

		const getCalloutType = (): (typeof calloutMatches)[number] | null => {
			try {
				const firstChild = node.children[0];
				if (!firstChild || firstChild.type !== "paragraph") return null;

				const firstChildText = firstChild.children[0];
				if (!firstChildText || firstChildText.type !== "text") return null;

				const matchingCalloutType = calloutMatches.find((calloutType) => {
					return firstChildText.value === `[!${calloutType}]`;
				});

				return matchingCalloutType ?? null;
			} catch (_error) {
				return null;
			}
		};

		const calloutType = getCalloutType();
		if (calloutType) {
			const [, ...content] = node.children;

			return (
				<Callout
					className="my-line"
					variant={calloutType.toLowerCase() as Lowercase<CalloutType>}
				>
					<InternalMarkdownRenderer nodes={content} />
				</Callout>
			);
		}

		return (
			<blockquote className="my-line px-4 italic bg-bg-muted/40 backdrop-blur-[1px] border-l-4 border-l-border ring-1 ring-inset ring-bg-muted rounded-xs rounded-l-[1px] space-y-line py-line">
				<InternalMarkdownRenderer nodes={node.children} />
			</blockquote>
		);
	}

	if (node.type === "inlineCode") {
		return (
			<code className="inline-block bg-bg-emphasis/10 backdrop-blur-xs text-fg  break-words before:content-['`'] before:font-bold before:text-fg/60 after:content-['`'] after:font-bold after:text-fg/60 rounded-xs">
				{node.value}
			</code>
		);
	}

	if (node.type === "code") {
		return <CodeBlock code={node.value} />;
	}

	if (node.type === "image") {
		// TODO: next image??
		return <img src={node.url} alt={node.alt ?? ""} />;
	}

	if (node.type === "table") {
		const [thead, ...tbody] = node.children;
		return (
			<table className="border">
				<thead className="group/thead">
					<InternalMarkdownRenderer nodes={[thead]} />
				</thead>
				<tbody>
					<InternalMarkdownRenderer nodes={tbody} />
				</tbody>
			</table>
		);
	}

	if (node.type === "tableRow") {
		return (
			<tr>
				<InternalMarkdownRenderer nodes={node.children} />
			</tr>
		);
	}

	if (node.type === "tableCell") {
		return (
			<td className="border-collapse border align-baseline py-[calc(var(--line-height-base)_/_2_-_0.5px)] px-3">
				<InternalMarkdownRenderer nodes={node.children} />
			</td>
		);
	}

	return null;
}
