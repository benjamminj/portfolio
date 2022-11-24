<script lang="ts">
	import Markdown from '$lib/components/markdown';
	import A from '$lib/components/markdown/a.svelte';
	import Tag from '$lib/components/tag.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let hasTags = data.post.tags.length > 0;
</script>

<svelte:head>
	<meta name="description" content={data.post.description} />
	<meta name="author" content="Benjamin Johnson" />
	<!-- twitter meta tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@benjamminj" />
	<meta name="twitter:creator" content="@benjamminj" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.post.description} />
	<!-- og meta tags -->
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{data.HOMEPAGE}/{data.slug}" />

	{#if hasTags}
		<meta name="keywords" content={data.post.tags.join(', ')} />
	{/if}
</svelte:head>

<Markdown hast={data.post.content} />

<!-- {data.post?.link && data?.post?.publisher && ( -->
{#if data.post.link && data.post.publisher}
	<p class="pt-4 prose dark:prose-invert">
		<A title={data.post.publisher} href={data.post.link}>
			Read the full article on {data.post.publisher}.
		</A>
	</p>
{/if}

{#if hasTags}
	<!-- TODO: multiple footers, or is something else more appropriate? -->
	<footer data-testid="SlugPage__footer" class="pt-12">
		<div>
			<div class="font-mono dark:text-gray-400">Tags</div>
			<ul class="dark:text-gray-200 flex space-x-2">
				{#each data.post.tags as tag}
					<li>
						<Tag {tag} />
					</li>
				{/each}
			</ul>
		</div>
	</footer>
{/if}
