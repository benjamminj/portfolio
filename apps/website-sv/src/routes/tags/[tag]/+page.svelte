<script lang="ts">
	import H from "$lib/h.svelte";
	import PostList from "$lib/post-list.svelte";
	import type { PageProps } from "./$types";

	let { data, params }: PageProps = $props();
	let tag = $derived(params.tag);
</script>

<H level={1} class="pb-line">
	posts tagged with "{tag}"
</H>

<PostList posts={data.filtered} />
