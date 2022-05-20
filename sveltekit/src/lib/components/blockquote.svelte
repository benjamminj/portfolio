<blockquote
	class="-mx-4 my-6 text-gray-900 bg-gray-100 border-gray-200 md:mx-0 lg:-mx-6 dark:bg-gray-900 dark:bg-opacity-30 dark:border-gray-900 dark:border-opacity-40 dark:text-white px-6 py-4 border-2 space-y-1"
>
	<slot />
</blockquote>

<style lang="postcss">
	blockquote :global(> p) {
		margin: 0;
	}

	blockquote :global(> p:before),
	blockquote :global(> p:after) {
		content: '';
	}
</style>
