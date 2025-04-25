import { A } from "@/lib/a";
import { cn } from "@/lib/cn";
import { Markdown } from "@/lib/markdown";
import { readFile } from "@/lib/read-file";

export default async function RootPage() {
	const raw = await readFile("intro.md");

	return (
		<>
			<Markdown raw={raw} __flushEdges />

			<nav
				className={cn(
					"flex flex-wrap gap-x-[1ch] pt-line",
					"*:not-last:after:content-['/']",
					"*:not-last:after:pl-[1ch]",
					"*:not-last:after:text-fg-muted",
					"*:not-last:after:no-underline",
				)}
			>
				<A href="/writing">writing</A>
				<A href="/about">about</A>
				<A target="_blank" rel="noopener noreferrer" href="/links/bluesky">
					bluesky
				</A>
				<A target="_blank" rel="noopener noreferrer" href="/links/email">
					email
				</A>
			</nav>
		</>
	);
}
