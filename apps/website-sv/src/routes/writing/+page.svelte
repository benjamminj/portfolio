<script lang="ts">
	import H from "$lib/h.svelte";
	import type { PageProps } from "./$types";
	import PostList from "$lib/post-list.svelte";

	let { data }: PageProps = $props();

	$inspect(">>>", data);
</script>

<H level={1} class="pb-line">writing</H>

<PostList posts={data.posts} />
