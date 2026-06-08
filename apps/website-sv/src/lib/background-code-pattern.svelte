<script lang="ts">
	import { cn } from "./cn";
	import { getBackgroundCodePatternText } from "./get-background-code-pattern-text";

	let innerWidth = $state(0);
	let innerHeight = $state(0);

	const { text, reps } = $derived(
		getBackgroundCodePatternText({
			height: innerHeight,
			width: innerWidth,
		}),
	);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
	class={cn(
		"absolute inset-0 overflow-hidden break-all transition-colors duration-500",
		reps > 0 ? "text-fg/4" : "text-transparent",
	)}
>
	{text}
</div>
