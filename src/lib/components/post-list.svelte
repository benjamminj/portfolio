<script lang="ts">
	import type { Post } from '../posts-service.server';
	import PostListItem from './post-list-item.svelte';

	export let posts: Post[];
</script>

<ul class="space-y-2">
	{#each posts as post}
		<li class="w-full">
			<PostListItem {post} />
		</li>
	{/each}
</ul>
