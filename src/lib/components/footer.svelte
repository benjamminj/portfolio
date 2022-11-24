<script lang="ts">
	const footerLinkStyles =
		'text-base underline text-gray-800 dark:text-gray-200 hover:dark:text-white font-bold';
</script>

<footer class="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 py-8">
	<div class="max-w-prose my-0 mx-auto px-4">
		<p class="dark:text-gray-400">
			{' '}
			&copy; {new Date().getFullYear()} Benjamin Johnson
		</p>
		<ul class="flex space-x-4" data-sveltekit-prefetch>
			<li>
				<a title="GitHub" href="https://github.com/benjamminj" class={footerLinkStyles}> github </a>
			</li>
			<li>
				<a title="Twitter" href="https://twitter.com/benjamminj" class={footerLinkStyles}>
					twitter
				</a>
			</li>
			<li>
				<a
					title="LinkedIn"
					href="https://www.linkedin.com/in/benjamin-d-johnson/"
					class={footerLinkStyles}
				>
					linkedin
				</a>
			</li>
			<li>
				<a title="Email" href="/links/email" class={footerLinkStyles}> email </a>
			</li>
			<li>
				<a title="RSS" href="/feed/rss.xml" class={footerLinkStyles}> rss </a>
			</li>
		</ul>
	</div>
</footer>
