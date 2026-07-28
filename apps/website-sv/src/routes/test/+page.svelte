<script lang="ts">
	import Markdown from "$lib/markdown.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<Markdown ast={data.ast} />
