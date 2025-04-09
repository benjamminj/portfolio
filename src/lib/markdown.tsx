import type { CompileContext } from "mdast-util-from-markdown/lib";
import { type ReactNode, createElement } from "react";
import { A } from "./a";
import { cn } from "./cn";
import { CodeBlock } from "./code-block";
import { MarkdownService } from "./markdown-service.server";

export async function Markdown({ raw }: { raw: string }) {
	const mdast = await MarkdownService.parseMarkdownToMdast(raw);

	if (!mdast) return null;

	return (
		<div className="text-LEGACY-medium mx-auto max-w-prose">
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
				<p className="text-LEGACY-medium mb-4">
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
							"bg-LEGACY-blue-50 text-LEGACY-blue-950 border-l-LEGACY-blue-500 dark:bg-LEGACY-blue-300/20 dark:text-LEGACY-blue-100 dark:border-l-LEGACY-blue-300/60",
							// Nested link colors (default blue doesn't have good enough contrast )
							"[&_a]:text-LEGACY-blue-950 [&_a:hover]:text-LEGACY-blue-900 dark:[&_a]:text-LEGACY-blue-100 dark:[&_a:hover]:text-LEGACY-blue-200",
							// Nested code styles
							"[&_code]:bg-LEGACY-blue-400/20 [&_code]:text-LEGACY-blue-900 [&_code:before]:text-LEGACY-blue-900 [&_code:after]:text-LEGACY-blue-900",
							"dark:[&_code]:bg-LEGACY-blue-400/20 dark:[&_code]:text-LEGACY-blue-50 dark:[&_code:before]:text-LEGACY-blue-200 dark:[&_code:after]:text-LEGACY-blue-200",
						),
						icon: "ℹ️",
					},
					TIP: {
						blockquote: cn(
							"bg-LEGACY-green-50 text-LEGACY-green-950 border-l-LEGACY-green-500 dark:bg-LEGACY-green-300/20 dark:text-LEGACY-green-100 dark:border-l-LEGACY-green-300/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-LEGACY-green-950 [&_a:hover]:text-LEGACY-green-900 dark:[&_a]:text-LEGACY-green-100 dark:[&_a:hover]:text-LEGACY-green-200",
							// Nested code styles
							"[&_code]:bg-LEGACY-green-400/20 [&_code]:text-LEGACY-green-900 [&_code:before]:text-LEGACY-green-900 [&_code:after]:text-LEGACY-green-900",
							"dark:[&_code]:bg-LEGACY-green-400/20 dark:[&_code]:text-LEGACY-green-50 dark:[&_code:before]:text-LEGACY-green-200 dark:[&_code:after]:text-LEGACY-green-200",
						),
						icon: "💡",
					},
					IMPORTANT: {
						blockquote: cn(
							"bg-LEGACY-purple-50 text-LEGACY-purple-950 border-l-LEGACY-purple-500 dark:bg-LEGACY-purple-300/20 dark:text-LEGACY-purple-100 dark:border-l-LEGACY-purple-300/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-LEGACY-purple-950 [&_a:hover]:text-LEGACY-purple-900 dark:[&_a]:text-LEGACY-purple-100 dark:[&_a:hover]:text-LEGACY-purple-200",
							// Nested code styles
							"[&_code]:bg-LEGACY-purple-400/20 [&_code]:text-LEGACY-purple-900 [&_code:before]:text-LEGACY-purple-900 [&_code:after]:text-LEGACY-purple-900",
							"dark:[&_code]:bg-LEGACY-purple-400/20 dark:[&_code]:text-LEGACY-purple-50 dark:[&_code:before]:text-LEGACY-purple-200 dark:[&_code:after]:text-LEGACY-purple-200",
						),
						icon: "📣",
					},
					WARNING: {
						blockquote: cn(
							"bg-LEGACY-yellow-50 text-LEGACY-yellow-950 border-l-LEGACY-yellow-500 dark:bg-LEGACY-yellow-300/30 dark:text-LEGACY-yellow-100 dark:border-l-LEGACY-yellow-300/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-LEGACY-yellow-950 [&_a:hover]:text-LEGACY-yellow-900 dark:[&_a]:text-LEGACY-yellow-100 dark:[&_a:hover]:text-LEGACY-yellow-200",
							// Nested code styles
							"[&_code]:bg-LEGACY-yellow-400/20 [&_code]:text-LEGACY-yellow-900 [&_code:before]:text-LEGACY-yellow-900 [&_code:after]:text-LEGACY-yellow-900",
							"dark:[&_code]:bg-LEGACY-yellow-400/20 dark:[&_code]:text-LEGACY-yellow-50 dark:[&_code:before]:text-LEGACY-yellow-200 dark:[&_code:after]:text-LEGACY-yellow-200",
						),
						icon: "⚠️",
					},
					CAUTION: {
						blockquote: cn(
							"bg-LEGACY-red-50 text-LEGACY-red-950 border-l-LEGACY-red-500 dark:bg-LEGACY-red-400/30 dark:text-LEGACY-red-100 dark:border-l-LEGACY-red-500/60",
							// Nested link colors (default blue doesn't have good enough contrast
							"[&_a]:text-LEGACY-red-950 [&_a:hover]:text-LEGACY-red-900 dark:[&_a]:text-LEGACY-red-100 dark:[&_a:hover]:text-LEGACY-red-200",
							// Nested code styles
							"[&_code]:bg-LEGACY-red-400/20 [&_code]:text-LEGACY-red-900 [&_code:before]:text-LEGACY-red-900 [&_code:after]:text-LEGACY-red-900",
							"dark:[&_code]:bg-LEGACY-red-400/20 dark:[&_code]:text-LEGACY-red-50 dark:[&_code:before]:text-LEGACY-red-200 dark:[&_code:after]:text-LEGACY-red-200",
						),
						icon: "🚨",
					},
				};

				const [, ...content] = node.children;

				const config = CALLOUT_TYPE_STYLES[calloutType];
				return (
					<blockquote
						className={cn(
							"p-4 mb-4 bg-LEGACY-bg-muted text-LEGACY-medium italic border-l-4 border-l-LEGACY-border-muted [&_:last-child]:mb-0",
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
				<blockquote className="p-4 mb-4 bg-LEGACY-bg-muted text-LEGACY-medium italic border-l-4 border-l-LEGACY-border-muted [&_>_:last-child]:mb-0">
					<InternalMarkdownRenderer nodes={node.children} />
				</blockquote>
			);
		}

		if (node.type === "inlineCode") {
			return (
				<code className="bg-LEGACY-bg-muted text-LEGACY-pink-700 dark:text-LEGACY-pink-500 p-1 break-words before:content-['`'] before:font-bold before:text-LEGACY-pink-700 dark:before:text-LEGACY-pink-500 before:text-opacity-50 after:content-['`'] after:font-bold after:text-LEGACY-pink-700 dark:after:text-LEGACY-pink-500 after:text-opacity-50">
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
		h1: "text-LEGACY-h2 mb-6",
		h2: "text-LEGACY-h3 mb-4",
		h3: "text-LEGACY-h4 mb-4",
		h4: "text-LEGACY-h5 mb-4",
		h5: "text-LEGACY-h6 mb-4",
		h6: "text-LEGACY-h6 mb-4",
	};

	const headerStyle = styles[tag as unknown as keyof typeof styles];

	return createElement(
		tag,
		{ className: cn(headerStyle, "font-medium") },
		children,
	);
}
