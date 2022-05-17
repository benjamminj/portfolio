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
	import type { LoadInput } from '@sveltejs/kit'

	export const prerender = true
	export const load = async ({ fetch, params }: LoadInput<{ path: string }>) => {
		const path = params.path
		const json = await fetch(`/${path}/__data.json`).then((r) => r.json())
		return {
			props: {
				post: json.post
			}
		}
	}
</script>

<script lang="ts">
	import Prose from '$lib/components/prose.svelte'
	import type { Post } from '$lib/posts.service'

	export let post: Post
</script>

<Prose>
	{@html post.body}
</Prose>
