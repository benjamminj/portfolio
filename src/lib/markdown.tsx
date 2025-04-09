import { type ReactNode, createElement } from "react";
import { A } from "./a";
import { cn } from "./cn";
import { CodeBlock } from "./code-block";
import { MarkdownService } from "./markdown-service.server";
import type { CompileContext } from "mdast-util-from-markdown";

export async function Markdown({ raw }: { raw: string }) {
	const mdast = await MarkdownService.parseMarkdownToMdast(raw);

	if (!mdast) return null;

	return (
		<div className="text-medium mx-auto max-w-prose">
			<InternalMarkdownRenderer nodes={mdast.data as CompileContext["stack"]} />
		</div>
	);
}

function InternalMarkdownRenderer({
	nodes = [],
}: { nodes?: CompileContext["stack"] }) {
	return nodes.map((node) => {
		if (node.type === "heading") {
			return (
				<Heading level={node.depth}>
					<InternalMarkdownRenderer nodes={node.children} />
				</Heading>
			);
		}

		if (node.type === "text") {
			return node.value;
		}

		if (node.type === "paragraph") {
			return (
				<p className="text-medium mb-4">
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
				<hr className="relative h-auto my-16 font-mono tracking-tighter text-center border-none before:content-['*_*_*'] before:text-lg dark:text-gray-400" />
			);
		}

		if (node.type === "strong") {
			return (
				<strong>
					<InternalMarkdownRenderer nodes={node.children} />
				</strong>
			);
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
				<ol className="pl-8 list-decimal [&_ol]:list-[lower-alpha]">
					<InternalMarkdownRenderer nodes={node.children} />
				</ol>
			);
		}

		if (node.type === "list" && !node.ordered) {
			return (
				<ul className="pl-4 list-disc [&_ul]:list-[circle] [&_li]:pl-2">
					<InternalMarkdownRenderer nodes={node.children} />
				</ul>
			);
		}

		if (node.type === "listItem") {
			return (
				<li className="relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute">
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
				const CALLOUT_TYPE_STYLES: Record<
					CalloutType,
					{ blockquote: string; icon: string }
				> = {
					// TODO: light mode styles
					NOTE: {
						blockquote: cn(
							"bg-blue-50 text-blue-950 border-l-blue-500 dark:bg-blue-300/20 dark:text-blue-100 dark:border-l-blue-300/60",
							// Nested link colors (default blue doesn't have good enough contrast )
							"[&_a]:text-blue-950 [&_a:hover]:text-blue-900 dark:[&_a]:text-blue-100 dark:[&_a:hover]:text-blue-200",
							// Nested code styles
							"[&_code]:bg-blue-400/20 [&_code]:text-blue-900 [&_code:before]:text-blue-900 [&_code:after]:text-blue-900",
							"dark:[&_code]:bg-blue-400/20 dark:[&_code]:text-blue-50 dark:[&_code:before]:text-blue-200 dark:[&_code:after]:text-blue-200",
						),
						icon: "ℹ️",
					},
					TIP: {
						blockquote: cn(
							"bg-green-50 text-green-950 border-l-green-500 dark:bg-green-300/20 dark:text-green-100 dark:border-l-green-300/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-green-950 [&_a:hover]:text-green-900 dark:[&_a]:text-green-100 dark:[&_a:hover]:text-green-200",
							// Nested code styles
							"[&_code]:bg-green-400/20 [&_code]:text-green-900 [&_code:before]:text-green-900 [&_code:after]:text-green-900",
							"dark:[&_code]:bg-green-400/20 dark:[&_code]:text-green-50 dark:[&_code:before]:text-green-200 dark:[&_code:after]:text-green-200",
						),
						icon: "💡",
					},
					IMPORTANT: {
						blockquote: cn(
							"bg-purple-50 text-purple-950 border-l-purple-500 dark:bg-purple-300/20 dark:text-purple-100 dark:border-l-purple-300/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-purple-950 [&_a:hover]:text-purple-900 dark:[&_a]:text-purple-100 dark:[&_a:hover]:text-purple-200",
							// Nested code styles
							"[&_code]:bg-purple-400/20 [&_code]:text-purple-900 [&_code:before]:text-purple-900 [&_code:after]:text-purple-900",
							"dark:[&_code]:bg-purple-400/20 dark:[&_code]:text-purple-50 dark:[&_code:before]:text-purple-200 dark:[&_code:after]:text-purple-200",
						),
						icon: "📣",
					},
					WARNING: {
						blockquote: cn(
							"bg-yellow-50 text-yellow-950 border-l-yellow-500 dark:bg-yellow-300/30 dark:text-yellow-100 dark:border-l-yellow-300/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-yellow-950 [&_a:hover]:text-yellow-900 dark:[&_a]:text-yellow-100 dark:[&_a:hover]:text-yellow-200",
							// Nested code styles
							"[&_code]:bg-yellow-400/20 [&_code]:text-yellow-900 [&_code:before]:text-yellow-900 [&_code:after]:text-yellow-900",
							"dark:[&_code]:bg-yellow-400/20 dark:[&_code]:text-yellow-50 dark:[&_code:before]:text-yellow-200 dark:[&_code:after]:text-yellow-200",
						),
						icon: "⚠️",
					},
					CAUTION: {
						blockquote: cn(
							"bg-red-50 text-red-950 border-l-red-500 dark:bg-red-400/30 dark:text-red-100 dark:border-l-red-500/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-red-950 [&_a:hover]:text-red-900 dark:[&_a]:text-red-100 dark:[&_a:hover]:text-red-200",
							// Nested code styles
							"[&_code]:bg-red-400/20 [&_code]:text-red-900 [&_code:before]:text-red-900 [&_code:after]:text-red-900",
							"dark:[&_code]:bg-red-400/20 dark:[&_code]:text-red-50 dark:[&_code:before]:text-red-200 dark:[&_code:after]:text-red-200",
						),
						icon: "🚨",
					},
				};

				const [, ...content] = node.children;

				const config = CALLOUT_TYPE_STYLES[calloutType];
				return (
					<blockquote
						className={cn(
							"p-4 mb-4 bg-bg-muted text-medium italic border-l-4 border-l-border-muted [&_:last-child]:mb-0",
							config.blockquote,
						)}
					>
						<div className="grid grid-cols-[auto_1fr] gap-3">
							<div aria-label={calloutType} className="not-italic font-serif">
								{config.icon}
							</div>
							<div>
								<InternalMarkdownRenderer nodes={content} />
							</div>
						</div>
					</blockquote>
				);
			}

			return (
				<blockquote className="p-4 mb-4 bg-bg-muted text-medium italic border-l-4 border-l-border-muted [&_>_:last-child]:mb-0">
					<InternalMarkdownRenderer nodes={node.children} />
				</blockquote>
			);
		}

		if (node.type === "inlineCode") {
			return (
				<code className="bg-bg-muted text-pink-700 dark:text-pink-500 p-1 break-words before:content-['`'] before:font-bold before:text-pink-700 dark:before:text-pink-500 before:text-opacity-50 after:content-['`'] after:font-bold after:text-pink-700 dark:after:text-pink-500 after:text-opacity-50">
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
				<table>
					<thead>
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
				<td>
					<InternalMarkdownRenderer nodes={node.children} />
				</td>
			);
		}

		return null;
	});
}

function Heading({
	level = 2,
	children,
}: { level?: number; children: ReactNode }) {
	const tag = `h${Math.max(Math.min(level, 6), 1)}`;
	const styles = {
		h1: "text-h2 mb-6",
		h2: "text-h3 mb-4",
		h3: "text-h4 mb-4",
		h4: "text-h5 mb-4",
		h5: "text-h6 mb-4",
		h6: "text-h6 mb-4",
	};

	const headerStyle = styles[tag as unknown as keyof typeof styles];

	return createElement(
		tag,
		{ className: cn(headerStyle, "font-medium") },
		children,
	);
}
