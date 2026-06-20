<script lang="ts">
	import A from "$lib/a.svelte";
	import { cn } from "$lib/cn";
	import Markdown from "$lib/markdown.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<Markdown ast={data.ast} />

<nav
	class={cn(
		"flex flex-wrap gap-x-ch pt-line",
		"*:not-last:after:content-['/']",
		"*:not-last:after:pl-ch",
		"*:not-last:after:text-fg-muted",
		"*:not-last:after:no-underline",
	)}
>
	<A href="/writing">writing</A>
	<A href="/about">about</A>
	<A target="_blank" rel="noopener noreferrer" href="/links/bluesky">bluesky</A>
	<A target="_blank" rel="noopener noreferrer" href="/links/email">email</A>
</nav>
