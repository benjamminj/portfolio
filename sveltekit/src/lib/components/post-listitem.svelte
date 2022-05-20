<script lang="ts">
	import type { Post } from '$lib/posts.service'
	import Tag from './tag.svelte'

	export let post: Omit<Post, 'body'>
</script>

<!-- TODO: better markup... div probably isn't correct? -->
<div class="relative p-4 -mx-4 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-50">
	<div class="space-y-1 md:flex md:space-y-0 md:space-x-4">
		<time
			class="text-gray-500 dark:text-gray-400 flex items-end flex-shrink-0 font-mono text-sm md:h-8 md:pt-1 md:pb-1.5 tabular-nums leading-none"
		>
			{post.date}
		</time>

		<div>
			<!-- TODO: dynamic `h` to work better? -->
			<h2 class="text-2xl">
				<a
					sveltekit:prefetch
					data-testid="PostListItem__title"
					href={post.slug}
					title={post.title}
					class="font-semibold text-gray-800 no-underline hover:text-gray-800 dark:text-gray-200 dark:hover:text-white hover:underline before:empty-content before:absolute before:inset-0"
				>
					{post.title}
				</a>
			</h2>

			{#if post.tags?.length > 0}
				<ul class="relative z-10 flex flex-wrap -ml-2">
					{#each post.tags as tag}
						<li class="ml-2">
							<Tag {tag} />
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
