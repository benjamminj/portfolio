<script lang="ts" context="module">
	import type { LoadInput } from '@sveltejs/kit'

	export const prerender = true
	export const load = async ({ fetch, params }: LoadInput<{ tag: string }>) => {
		const tag = params.tag
		const json = await fetch(`/tags/${tag}/__data.json`).then((r) => r.json())
		return {
			props: { posts: json.posts },
			stuff: {
				title: `#${tag}`,
				seo: {
					title: tag,
					description: `All posts categorized under #${tag}`,
					keywords: [tag]
				}
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
	{#each posts as post (post.slug)}
		<li class="w-full">
			<PostListitem {post} />
		</li>
	{/each}
</ul>
