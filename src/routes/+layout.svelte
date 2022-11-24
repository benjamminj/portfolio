<script lang="ts">
	import Banner from '$lib/components/banner.svelte';
	import Header from '$lib/components/header.svelte';
	import clsx from 'clsx';
	import { page } from '$app/stores';
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';

	// TODO: move this to be programmatic based on the type of posts...
	const preserveTitleCasing = false;
</script>

<svelte:head>
	<!-- title: data.title,
    description: data.post.description, -->
	<title>{$page.data.title || 'Benjamin Johnson'}</title>
</svelte:head>

<div class="relative">
	<div class="absolute inset-x-0 top-0">
		<Header />
	</div>
</div>

<Banner>
	<div class="space-y-4">
		{#if $page.data.title}
			<h1 class={clsx('text-5xl font-bold break-words', !preserveTitleCasing && 'lowercase')}>
				{$page.data.title}
			</h1>
		{/if}

		{#if $page.data.subtitle}
			<h2 class="text-2xl font-normal text-gray-700 lowercase dark:text-gray-400">
				{$page.data.subtitle}
			</h2>
		{/if}
	</div>
</Banner>

<div class="p-4 py-10 mx-auto my-0 max-w-viewport md:max-w-prose md:min-w-prose flex-grow">
	<slot />
</div>

<Footer />
