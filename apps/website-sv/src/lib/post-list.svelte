<script lang="ts">
	import type { Post } from "./posts-service.server";
	import Tag from "./tag.svelte";

	type Props = {
		posts: Post[];
	};

	let { posts }: Props = $props();
</script>

<ul class="flex flex-col gap-line">
	{#each posts as post}
		<li>
			{@render postListItem(post)}
		</li>
	{/each}
</ul>

{#snippet postListItem(post: Post)}
  {const year = new Date(post.date).getFullYear()}

	<div class="flex gap-3">
			<time class="text-fg-muted text-body">{year}</time>

			<div class="leading-0 flex-col flex">
				<a
					href={`/${post.slug}`}
					data-testid="PostListItem__title"
					title={post.title}
					class="text-heading hover:underline"
				>
					{post.title}
			</a>

			{#if post.tags && post.tags.length > 0}
				<ul class="inline-block space-x-ch wrap-break-word">
					{#each post.tags as tag}
						<li class="inline">
							<Tag tag={tag} />
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/snippet}
