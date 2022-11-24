<script lang="ts">
	import CopyPasteButton from './copy-paste-button.svelte';

	export let code: string;
	let ref: HTMLElement | undefined = undefined;
</script>

<div class="relative">
	{#if typeof document !== 'undefined' && ref?.innerText}
		<CopyPasteButton code={ref?.innerText} />
	{/if}

	<pre
		class="rounded-none p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-gray-100 md:mx-0 lg:-mx-6 dark:bg-gray-900"><code
			class="overflow-auto"
			bind:this={ref}>{@html code}</code
		></pre>
</div>
