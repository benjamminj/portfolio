<!-- TODO: prerendering -->
<!--  
export async function generateStaticParams() {
	const posts = await PostService.list();
	const tags = posts.flatMap((post) => post.tags);
	const unique = new Set(tags);

	return Array.from(unique).map((tag) => ({ tag }));
}
-->

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
