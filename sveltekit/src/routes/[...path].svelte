<!-- 
  @component `Post`

  @todo 
  - [ ] metadata
  - [ ] non-capitalized title for "recipes"
  - [ ] markdown rendering, esp on code examples
  - [ ] redirect to 404 page if the post doesn't exist
-->
<script lang="ts" context="module">
	import type { Load } from '.svelte-kit/types/src/routes'
	import type { LoadInput, LoadOutput } from '@sveltejs/kit'

	export const prerender = true
	export const load = async ({
		fetch,
		params
	}: LoadInput<{ path: string }>): Promise<LoadOutput> => {
		const path = params.path
		const json = await fetch(`/${path}/__data.json`).then((r) => r.json())

		return {
			props: {
				post: json.post
			},
			stuff: {
				title: json.post.title,
				subtitle: `<span class="text-base">${json.post.date}</span>`,
				date: json.post.date,
				seo: {
					title: json.post.title,
					description: json.post.description ?? null,
					keywords: json.post.tags ?? null
				}
			}
		}
	}
</script>

<script lang="ts">
	import Prose from '$lib/components/prose.svelte'
	import type { Post } from '$lib/posts.service'
	import Tag from '$lib/components/tag.svelte'

	export let post: Post
</script>

<Prose>
	{@html post.body}
</Prose>

<footer>
	<footer data-testid="SlugPage__footer" class="py-12">
		<div>
			<div class="font-mono dark:text-gray-400">Tags</div>
			<ul class="dark:text-gray-200 flex space-x-2">
				<!-- {#each post.} -->
				{#each post.tags as tag}
					<li>
						<Tag {tag} />
					</li>
				{/each}
			</ul>
		</div>
	</footer>
</footer>
