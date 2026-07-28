<script lang="ts">
	import { cn } from "./cn";
	import { getBackgroundCodePatternText } from "./get-background-code-pattern-text";

	let clientWidth = $state(0);
	let clientHeight = $state(0);

	const { text, reps } = $derived(
		getBackgroundCodePatternText({
			height: clientHeight,
			width: clientWidth,
		}),
	);
</script>

<svelte:body bind:clientHeight bind:clientWidth />

<div
	class={cn(
		"absolute inset-0 -z-10 overflow-hidden break-all transition-colors duration-500",
		reps > 0 ? "text-fg/4" : "text-transparent",
	)}
>
	{text}
</div>
