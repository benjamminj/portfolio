<script context="module" lang="ts">
	import type { Load } from '.svelte-kit/types/src/routes'

	export const prerender = true
	export const load: Load = async ({ fetch }) => {
		const json = await fetch('/markdown-test/__data.json').then((res) => res.json())
		return {
			props: { content: json.content },
			stuff: {
				title: 'Markdown test',
				subtitle: 'Just a test of all the markdown elements'
			}
		}
	}
</script>

<script lang="ts">
	// import Prose from '$lib/components/prose.svelte'
	import type { HtmlAst } from '$lib/prune-hast'
	import MarkdownRenderer from '$lib/components/markdown-renderer.svelte'

	export let content: HtmlAst
</script>

<MarkdownRenderer content={content.children} />
