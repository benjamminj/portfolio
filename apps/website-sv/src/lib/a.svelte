<script lang="ts">
	import type { Snippet } from "svelte";
	import { type HTMLAnchorAttributes } from "svelte/elements";
	import { cn } from "./cn";

	type Props = HTMLAnchorAttributes & {
		href: string;
		children: Snippet;
	};
	let { children, ...props }: Props = $props();
</script>

<a
	{...props}
	class={cn(
		"underline text-body font-bold cursor-pointer text-fg-link hover:text-fg-link-hover",
		props.class,
	)}
>
	{@render children()}
</a>
