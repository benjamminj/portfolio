<script lang="ts">
	import HeaderLink from './header-link.svelte'
</script>

<header class="z-header max-w-viewport">
	<div class="max-w-prose my-0 mx-auto">
		<div class="justify-between block p-4 space-y-2 sm:flex sm:space-y-0">
			<a href="/" class="inline-block text-xl font-medium text-black no-underline dark:text-white">
				<span class="lowercase">Benjamin Johnson</span>
			</a>

			<div class="flex mt-2 space-x-4 lowercase">
				<nav>
					<div class="flex items-center space-x-4">
						<HeaderLink title="Writing" href="/writing">writing</HeaderLink>
						<HeaderLink title="GitHub" href="https://github.com/benjamminj">github</HeaderLink>
						<HeaderLink title="Contact" href="mailto:benjamin.d.johnson@icloud.com">
							contact
						</HeaderLink>
					</div>
				</nav>
			</div>
		</div>
	</div>
</header>
