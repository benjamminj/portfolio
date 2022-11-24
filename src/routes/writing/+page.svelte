<script lang="ts">
	import PostList from '$lib/components/post-list.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<PostList posts={data.posts} />
</main>
