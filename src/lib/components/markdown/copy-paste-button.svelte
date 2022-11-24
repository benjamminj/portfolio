<script lang="ts">
	import { onDestroy } from 'svelte';
	import Check from '../icons/check.svelte';
	import ClipboardIcon from '../icons/clipboard.svelte';
	const copyToClipboard = (input: string) => {
		const $el = document.createElement('textarea');
		$el.value = input;

		// Make sure we hide the element from sight
		$el.setAttribute('readonly', '');
		$el.style.position = 'absolute';
		$el.style.left = '-9999px';

		document.body.appendChild($el);

		// Select the input, this is the same as dragging your cursor over it.
		$el.select();
		// Copy the current selection to the clipboard
		document.execCommand('copy');

		// Finally, clean up after ourselves
		document.body.removeChild($el);
	};

	export let code: string;
	let copied = false;
	let timeout: number | undefined = undefined;

	$: {
		if (copied) {
			console.log('here!!');
			copyToClipboard(code);
			timeout = window.setTimeout(() => {
				copied = false;
			}, 2000);
		} else {
			if (timeout) {
				window.clearTimeout(timeout);
				timeout = undefined;
			}
		}
	}

	onDestroy(() => {
		if (timeout) {
			window.clearTimeout(timeout);
		}
	});
</script>

<button
	type="button"
	on:click={() => {
		copied = true;
	}}
	class="absolute right-0 flex items-center justify-center w-8 h-8 text-gray-700 dark:text-white text-opacity-50 md:right-6 top-1 ring-gray-400 dark:ring-white ring-opacity-70 focus:outline-none focus:bg-gray-300 focus:bg-opacity-20 focus:text-opacity-100 hover:text-opacity-100 focus:ring-2"
>
	{#if copied}
		<div class="relative">
			<Check aria-hidden="true" class="w-5 h-5 text-green-600 dark:text-green-400" />
			<div
				class="fixed z-10 px-2 py-2 mt-2 text-black dark:text-white text-opacity-100 transform bg-white shadow-md dark:bg-gray-600 bottom-2 left-2 right-2 xs:py-1 xs:-translate-x-2/3 xs:absolute xs:right-auto xs:bottom-auto xs:left-1/2 xs:top-full md:-translate-x-1/2 animate-fadein [animation-fill-mode:both] opacity-0"
			>
				Copied!
			</div>
		</div>
	{:else}
		<ClipboardIcon
			aria-hidden="true"
			className="w-5 h-5 dark:text-gray-400 hover:dark:text-white transition-colors"
		/>
		<span class="sr-only">Copy to clipboard</span>
	{/if}
</button>
