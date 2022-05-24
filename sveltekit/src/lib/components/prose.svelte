<!-- 
	@component `Prose`

	This component is a wrapper for markdown content. It will render all of the raw HTML
	underneath the markdown with fancy styling.

	@example
	```svelte
	<script>
		import Prose from '$lib/components/prose.svelte'
		const content = '<h1>Hello, world!</h1>'
	</script>

	<Prose>
		{@html content}
	</Prose>

	@todo
	- [ ] Implement a custom markdown renderer. This will likely result in a little more
				Svelte code, but the CSS will become easier to read and the primitive building
				blocks will be usable in places other than markdown.
	- [ ] Add back in the copy-paste functionality on code blocks. I'll need to do this
			  before migrating the actual blog posts pages.
	```
 -->
<script lang="ts">
	const styles = {
		// TODO: how to unify the link styles here with the other sections of the site??
		a: 'prose-a:px-0.5 prose-a:font-medium prose-a:text-gray-500 prose-a:underline prose-a:bg-transparent hover:prose-a:text-gray-600 dark:prose-a:text-gray-300 dark:hover:prose-a:text-white dark:hover:prose-a:border-white',
		p: 'prose-p:mb-6 prose-p:text-base prose-p:leading-7',
		h2: 'prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-3xl prose-h2:font-medium',
		h3: 'prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-2xl prose-h3:font-medium',
		h4: 'prose-h4:mt-10 prose-h4:mb-4 prose-h4:text-xl prose-h4:font-medium',
		h5: 'prose-h5:mt-6 prose-h5:mb-4 prose-h5:text-lg prose-h5:font-medium',
		h6: 'prose-h6:mt-6 prose-h6:mb-4 prose-h6:text-base prose-h6:font-medium',
		pre: 'prose-pre:rounded-none prose-pre:p-6 prose-pre:pt-8 prose-pre:my-6 prose-pre:-mx-4 prose-pre:overflow-auto prose-pre:text-base prose-pre:bg-gray-100 prose-pre:md:mx-0 prose-pre:lg:-mx-6 prose-pre:dark:bg-gray-900',
		ol: 'prose-ol:pl-8 prose-ol:list-none',
		ul: 'prose-ul:pl-6 prose-ul:list-none',
		li: 'prose-li:relative prose-li:pl-2 prose-li:my-4 prose-li:text-base prose-li:leading-7 prose-li:before:-left-4 prose-li:before:absolute',
		hr: "prose-hr:relative prose-hr:h-auto prose-hr:my-16 prose-hr:font-mono prose-hr:tracking-tighter prose-hr:text-center prose-hr:border-none prose-hr:before:content-['*_*_*'] prose-hr:before:text-lg prose-hr:dark:text-gray-400",
		blockquote:
			'prose-blockquote:-mx-4 prose-blockquote:my-6 prose-blockquote:text-gray-900 prose-blockquote:bg-gray-100 prose-blockquote:border-gray-200 prose-blockquote:md:mx-0 prose-blockquote:lg:-mx-6 prose-blockquote:dark:bg-gray-900 prose-blockquote:dark:bg-opacity-30 prose-blockquote:dark:border-gray-900 prose-blockquote:dark:border-opacity-40 prose-blockquote:dark:text-white prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:border-2 prose-blockquote:space-y-1'
	}

	const proseComponents = Object.values(styles).join(' ')
</script>

<div class="max-w-prose prose dark:prose-invert text-black dark:text-white {proseComponents}">
	<slot />
</div>

<style lang="postcss">
	/*****************************************************************************
  * Lists
  *****************************************************************************/
	.prose :global(ul > li:before) {
		content: '●';
		font-size: 0.625rem;

		@apply leading-7;
	}

	.prose :global(li li:before) {
		content: '○';
	}

	.prose :global(ol) {
		counter-reset: ol-count;
	}

	.prose :global(ol > li:before) {
		content: counter(ol-count) '.';
		counter-increment: ol-count;
	}

	.prose :global(li::marker),
	.prose :global(::marker) {
		display: none !important;
	}

	/*****************************************************************************
  * Blockquote
  *****************************************************************************/
	.prose :global(blockquote > p) {
		margin: 0;
	}

	/*****************************************************************************
  * Inline Code
  *****************************************************************************/
	/* .prose :global(code) {
		--inline-code-bg: theme('colors.gray.100');
	}

	@media (prefers-color-scheme: dark) {
		.prose :global(code) {
			--inline-code-bg: theme('colors.gray.900');
		}
	} */

	/* .prose :global(code) {
		@apply p-1 break-words;
		background: var(--inline-code-bg);
	} */

	/*****************************************************************************
  * Highlighted Code Blocks
  *****************************************************************************/
	.prose :global(pre code) {
		--code-bg: theme('colors.gray.100');
		--code-fg: theme('colors.gray.900');

		--first-color: theme('colors.blue.600');
		--second-color: theme('colors.gray.500');
		--fourth-color: theme('colors.green.700');
		--third-color: theme('colors.pink.700');
	}

	@media (prefers-color-scheme: dark) {
		.prose :global(pre code) {
			--code-bg: theme('colors.gray.800');
			--code-fg: theme('colors.gray.100');

			--first-color: theme('colors.indigo.300');
			--second-color: theme('colors.purple.300');
			--third-color: theme('colors.green.300');
			--fourth-color: theme('colors.yellow.200');
		}
	}

	.prose :global(pre code) {
		background-color: var(--code-bg);
		color: var(--code-fg);
	}

	.prose :global(pre code) {
		@apply bg-transparent p-0 text-left whitespace-pre break-normal leading-6;
		word-spacing: normal;
	}

	.prose :global(pre code::-moz-selection),
	.prose :global(pre code ::-moz-selection) {
		text-shadow: none;
		color: theme('colors.black');
		background: theme('colors.white');
	}

	.prose :global(pre code::selection),
	.prose :global(pre code ::selection) {
		text-shadow: none;
		color: theme('colors.black');
		background: theme('colors.white');
	}

	@media print {
		.prose :global(pre code) {
			text-shadow: none;
		}
	}

	.prose :global(.token.comment),
	.prose :global(.token.prolog),
	.prose :global(.token.doctype),
	.prose :global(.token.cdata) {
		/* TODO: tokenize this into CSS var */
		color: theme('colors.gray.400');
	}

	.prose :global(.token.punctuation) {
		color: var(--second-color);
	}

	.prose :global(.namespace) {
		opacity: 0.7;
	}

	.prose :global(.token.property),
	.prose :global(.token.tag),
	.prose :global(.token.boolean),
	.prose :global(.token.number),
	.prose :global(.token.constant),
	.prose :global(.token.symbol) {
		color: inherit;
	}

	.prose :global(.token.selector),
	.prose :global(.token.attr-name),
	.prose :global(.token.string),
	.prose :global(.token.char),
	.prose :global(.token.builtin) {
		color: var(--fourth-color);
	}

	.prose :global(.token.deleted) {
		color: theme('colors.red.600');
	}

	.prose :global(.token.inserted) {
		color: theme('colors.green.500');
	}

	.prose :global(.token.operator),
	.prose :global(.token.entity),
	.prose :global(.token.url),
	.prose[class='.language-css'] :global(.token.string),
	.prose :global(.style) :global(.token.string) {
		color: var(--first-color);
	}

	.prose :global(.token.atrule),
	.prose :global(.token.attr-value),
	.prose :global(.token.keyword) {
		color: var(--first-color);
	}

	.prose :global(.token.function) {
		color: var(--third-color);
	}

	.prose :global(.token.regex),
	.prose :global(.token.important),
	.prose :global(.token.variable) {
		color: var(--second-color);
	}

	.prose :global(.token.important),
	.prose :global(.token.bold) {
		font-weight: 700;
	}

	.prose :global(.token.italic) {
		font-style: italic;
	}

	.prose :global(.token.entity) {
		cursor: help;
	}
</style>
