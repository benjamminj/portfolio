<script lang="ts">
	import H from "$lib/h.svelte";
	import Markdown from "$lib/markdown.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<H level={1} class="pb-line">about me</H>

<Markdown ast={data.ast} />
