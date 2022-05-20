<ul class="pl-6 list-none">
	<slot />
</ul>

<style lang="postcss">
	ul > :global(li:before) {
		content: '●';
		font-size: 0.625rem;

		@apply leading-7;
	}

	ul :global(li li:before) {
		content: '○';
	}
</style>
