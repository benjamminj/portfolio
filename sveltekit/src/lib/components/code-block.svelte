<script lang="ts">
	import Check from '$lib/icons/check.svelte'
	import Clipboard from '$lib/icons/clipboard.svelte'
	import { copyToClipboard } from '$lib/copy-to-clipboard'

	export let code: string
	export let lang: string

	let copied = false
	let pre: HTMLPreElement | null = null

	const handleCopy = () => {
		if (copied || !pre) return

		copyToClipboard(pre?.innerText)
		copied = true

		setTimeout(() => {
			copied = false
		}, 2000)
	}
</script>

<div class="relative">
	<!-- TODO: only show button if client-side JS is enabled? -->
	<button
		type="button"
		title="Copy to clipboard"
		aria-label="Copy to clipboard"
		class="absolute right-0 flex items-center justify-center w-8 h-8 text-gray-700 dark:text-white text-opacity-50 md:right-6 top-1 ring-gray-400 dark:ring-white ring-opacity-70 focus:outline-none focus:bg-gray-300 focus:bg-opacity-20 focus:text-opacity-100 hover:text-opacity-100 focus:ring-2"
		on:click={handleCopy}
	>
		{#if copied}
			<div class="relative">
				<Check class="w-5 h-5 text-green-500 dark:text-green-400" />
				<!-- TODO: better markup?? -->
				<div
					class="fixed z-10 px-2 py-2 mt-2 text-black dark:text-white text-opacity-100 transform bg-white shadow-md dark:bg-gray-600 bottom-2 left-2 right-2 xs:py-1 xs:-translate-x-2/3 xs:absolute xs:right-auto xs:bottom-auto xs:left-1/2 xs:top-full md:-translate-x-1/2"
				>
					Copied!
				</div>
			</div>
		{:else}
			<Clipboard class="w-5 h-5" />
		{/if}
	</button>

	<pre
		class="flex flex-col rounded-none p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-gray-100 md:mx-0 lg:-mx-6 dark:bg-gray-900"
		bind:this={pre}>
		<code class={`language-${lang}`}>{@html code}</code>
	</pre>
</div>

<style lang="postcss">
	pre code {
		--code-bg: theme('colors.gray.100');
		--code-fg: theme('colors.gray.900');

		--first-color: theme('colors.blue.600');
		--second-color: theme('colors.gray.500');
		--fourth-color: theme('colors.green.700');
		--third-color: theme('colors.pink.700');
	}

	@media (prefers-color-scheme: dark) {
		pre code {
			--code-bg: theme('colors.gray.800');
			--code-fg: theme('colors.gray.100');

			--first-color: theme('colors.indigo.300');
			--second-color: theme('colors.purple.300');
			--third-color: theme('colors.green.300');
			--fourth-color: theme('colors.yellow.200');
		}
	}

	pre code {
		display: block;
		padding: 0;
		background-color: var(--code-bg);
		color: var(--code-fg);
	}

	pre code {
		@apply bg-transparent p-0 text-left whitespace-pre break-normal leading-6;
		word-spacing: normal;
	}

	pre code::-moz-selection,
	pre code ::-moz-selection {
		text-shadow: none;
		color: theme('colors.black');
		background: theme('colors.white');
	}

	pre code::selection,
	pre code ::selection {
		text-shadow: none;
		color: theme('colors.black');
		background: theme('colors.white');
	}

	@media print {
		pre code {
			text-shadow: none;
		}
	}

	code :global(.token.comment),
	code :global(.token.prolog),
	code :global(.token.doctype),
	code :global(.token.cdata) {
		/* TODO: tokenize this into CSS var */
		color: theme('colors.gray.400');
	}

	code :global(.token.punctuation) {
		color: var(--second-color);
	}

	code :global(.namespace) {
		opacity: 0.7;
	}

	code :global(.token.property),
	code :global(.token.tag),
	code :global(.token.boolean),
	code :global(.token.number),
	code :global(.token.constant),
	code :global(.token.symbol) {
		color: inherit;
	}

	code :global(.token.selector),
	code :global(.token.attr-name),
	code :global(.token.string),
	code :global(.token.char),
	code :global(.token.builtin) {
		color: var(--fourth-color);
	}

	code :global(.token.deleted) {
		color: theme('colors.red.600');
	}

	code :global(.token.inserted) {
		color: theme('colors.green.500');
	}

	code :global(.token.operator),
	code :global(.token.entity),
	code :global(.token.url),
	code[class='.language-css'] :global(.token.string),
	code :global(.style) :global(.token.string) {
		color: var(--first-color);
	}

	code :global(.token.atrule),
	code :global(.token.attr-value),
	code :global(.token.keyword) {
		color: var(--first-color);
	}

	code :global(.token.function) {
		color: var(--third-color);
	}

	code :global(.token.regex),
	code :global(.token.important),
	code :global(.token.variable) {
		color: var(--second-color);
	}

	code :global(.token.important),
	code :global(.token.bold) {
		font-weight: 700;
	}

	code :global(.token.italic) {
		font-style: italic;
	}

	code :global(.token.entity) {
		cursor: help;
	}
</style>
