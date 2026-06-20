<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getPreContext } from "./pre.svelte";
	import type { Snippet } from "svelte";
	import { cn } from "./cn";

	const preformatted = getPreContext();
	type Props = HTMLAttributes<HTMLElement> & {
		children: Snippet;
	};
	const {
		children,
		class: classNameFromProps,
		...properties
	}: Props = $props();
	const classNames = preformatted
		? undefined
		: "inline-block bg-bg-emphasis/10 backdrop-blur-xs text-fg wrap-break-word before:content-['`'] before:font-bold before:text-fg/60 after:content-['`'] after:font-bold after:text-fg/60 rounded-xs";
</script>

<code class={cn(classNames, classNameFromProps)} {...properties}
	>{@render children()}
</code>
