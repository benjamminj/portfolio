<ol class="pl-8 list-none">
	<slot />
</ol>

<style>
	ol {
		counter-reset: ol-count;
	}

	ol > :global(li:before) {
		content: counter(ol-count) '.';
		counter-increment: ol-count;
	}
</style>
