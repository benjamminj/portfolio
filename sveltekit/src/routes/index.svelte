<script lang="ts" context="module">
	import type { Load } from '.svelte-kit/types/src/routes'

	export const prerender = true
	export const hydrate = false
	export const load: Load = async ({ fetch }) => {
		const json = await fetch('/__data.json').then((res) => res.json())
		return {
			props: { content: json.content },
			stuff: {
				title: "Hey, I'm Ben! 🔥",
				subtitle: "I'm a front-end software engineer based out of Seattle"
			}
		}
	}
</script>

<script lang="ts">
	import Prose from '$lib/components/prose.svelte'

	export let content: string
</script>

<Prose>
	{@html content}
</Prose>
