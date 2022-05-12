<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const prerender = true

	export const load: Load = async ({ fetch }) => {
		const json = await fetch('/writing/__data.json').then((r) => r.json())
		return { props: { posts: json.posts } }
	}
</script>

<script lang="ts">
	import type { Post } from '$lib/posts.service'
	import Header from '$lib/components/header.svelte'
	import PostListitem from '$lib/components/post-listitem.svelte'
	import Banner from '$lib/components/banner.svelte'

	export let posts: Omit<Post, 'body'>[] = []
</script>

<div class="relative">
	<div class="absolute inset-x-0 top-0">
		<Header />
	</div>

	<Banner>
		<div class="space-y-4">
			<!-- class:lowercase={!rawTitle} -->
			<h1 class="text-5xl font-bold break-words">writing</h1>

			<!-- {subtitle && (
				<h2 className="text-2xl font-normal text-gray-700 lowercase dark:text-gray-400">
					{subtitle}
				</h2>
			)} -->
		</div>
	</Banner>
</div>

<!-- TODO: move to a global layout file? -->
<div class="p-4 pt-10 mx-auto my-0 max-w-viewport md:max-w-prose">
	<ul class="space-y-2">
		{#each posts as post}
			<li class="w-full">
				<PostListitem {post} />
			</li>
		{/each}
	</ul>
</div>
