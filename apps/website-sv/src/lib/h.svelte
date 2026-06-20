<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "./cn";

	export type HLevel = 1 | 2 | 3 | 4 | 5 | 6;
	type HProps = HTMLAttributes<HTMLHeadingElement> & {
		level?: HLevel;
		children: Snippet;
		/**
		 * - `prefixed` will add a `#` prefix to the heading based on its level.
		 * - `bare` will not add a prefix, just the `h` tag & default typographic styles.
		 */
		variant?: "prefixed" | "bare";
	};

	let {
		level: controlledLevel = 2,
		children,
		variant = "prefixed",
		...props
	}: HProps = $props();

	let level = $derived(Math.min(Math.max(controlledLevel, 1), 6) as HLevel);
	let tag = $derived(`h${level}`);
</script>

<svelte:element
	this={tag}
	data-content={variant === "prefixed" ? "#".repeat(level) : undefined}
	{...props}
	class={cn(
		"text-heading before:text-fg-muted",
		variant === "prefixed" &&
			"before:content-[attr(data-content)] before:mr-ch before:no-underline before:inline-block",
		props.class,
	)}
>
	{@render children()}
</svelte:element>
