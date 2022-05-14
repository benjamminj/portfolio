<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const prerender = true

	export const load: Load = async ({ fetch }) => {
		const json = await fetch('/writing/__data.json').then((r) => r.json())
		return {
			props: { posts: json.posts },
			stuff: {
				title: 'Writing'
			}
		}
	}
</script>

<script lang="ts">
	import type { Post } from '$lib/posts.service'
	import PostListitem from '$lib/components/post-listitem.svelte'

	export let posts: Omit<Post, 'body'>[] = []
</script>

<ul class="space-y-2">
	{#each posts as post}
		<li class="w-full">
			<PostListitem {post} />
		</li>
	{/each}
</ul>
