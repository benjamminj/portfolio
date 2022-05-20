<code><slot /></code>

<style lang="postcss">
	code {
		--inline-code-bg: theme('colors.gray.100');
	}

	@media (prefers-color-scheme: dark) {
		code {
			--inline-code-bg: theme('colors.gray.900');
		}
	}

	code {
		@apply p-1 break-words;
		background: var(--inline-code-bg);
	}

	code:before,
	code:after {
		content: '`';
		color: theme('colors.gray.500');
	}
</style>
