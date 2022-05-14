<script lang="ts">
	// NOTE: in the future it may be nice to prefetch this CSS or use a HTTP/2 server
	// push to preload
	import '../app.css'
	import { page } from '$app/stores'
	import Header from '$lib/components/header.svelte'
	import Banner from '$lib/components/banner.svelte'

	let title = $page.stuff.title
	let preserveTitleCasing = $page.stuff.preserveTitleCasing
	// TODO: need to support components / HTML as subtitle for post pages, which may
	// require breaking out of the layout 🤔
	let subtitle = $page.stuff.subtitle
</script>

<div class="relative">
	<div class="absolute inset-x-0 top-0">
		<Header />
	</div>

	<Banner>
		<div class="space-y-4">
			{#if title}
				<h1 class="text-5xl font-bold break-words" class:lowercase={!preserveTitleCasing}>
					{title}
				</h1>
			{/if}

			{#if subtitle}
				<h2 class="text-2xl font-normal text-gray-700 lowercase dark:text-gray-400">
					{subtitle}
				</h2>
			{/if}
		</div>
	</Banner>
</div>

<div class="p-4 pt-10 mx-auto my-0 max-w-viewport md:max-w-prose">
	<slot />
</div>
