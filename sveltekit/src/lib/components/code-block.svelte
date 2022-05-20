<script lang="ts">
	import escape from 'lodash/escape'
	export let code: string
</script>

<pre
	class="rounded-none p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-gray-100 md:mx-0 lg:-mx-6 dark:bg-gray-900">
  <!-- TODO: make sure the code is processed w/ prism to have the syntax highlights... -->
  <code>{@html escape(code)}</code>
</pre>

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
