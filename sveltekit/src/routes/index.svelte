<script lang="ts" context="module">
	import type { Load } from '.svelte-kit/types/src/routes'

	export const prerender = true
	// export const hydrate = false
	export const load: Load = async ({ fetch }) => {
		const json = await fetch('/__data.json').then((res) => res.json())
		return {
			props: { content: json.content },
			stuff: {
				title: "Hi, I'm Ben! 🔥",
				subtitle: "I'm a front-end software engineer based out of Seattle"
			}
		}
	}
</script>

<script lang="ts">
	import MarkdownRenderer from '$lib/components/markdown-renderer.svelte'
	import Prose from '$lib/components/prose.svelte'
	import type { HtmlAst } from '$lib/prune-hast'

	export let content: HtmlAst
	// console.log('>>', content)
</script>

<MarkdownRenderer content={content.children} />
<!-- <Prose>
	{@html content}
</Prose> -->
