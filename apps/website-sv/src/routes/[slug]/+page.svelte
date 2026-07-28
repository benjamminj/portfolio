<script lang="ts">
	import { flatten } from "flat";

	import A from "$lib/a.svelte";
	import H from "$lib/h.svelte";
	import Markdown from "$lib/markdown.svelte";
	import Tag from "$lib/tag.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const meta = $derived(
		flatten<typeof data.meta, Record<string, string | undefined>>(data.meta, {
			delimiter: ":",
		}),
	);
</script>

<svelte:head>
	{#each Object.keys(meta) as key}
		{const content = meta[key]}
		{#if content}
			<meta name={key} content={content} />
		{/if}
	{/each}
</svelte:head>

<H level={1} class="mb-line">
	{data.post.title}
</H>

<Markdown ast={data.post.ast} />

{#if data.post.link && data.post.publisher}
	<p class="pt-line max-w-prose mx-auto">
		<A title={data.post.publisher} href={data.post.link}>
			Read the full article on {data.post.publisher}.
		</A>
	</p>
{/if}

{#if data.post.tags?.length > 0}
	<footer
		data-testid="SlugPage__footer"
		class="pt-line-2 max-w-prose text-fg-muted"
	>
		<div>
			<div class="text-small lowercase">Last updated {data.post.date}</div>

			<ul class="flex space-x-2">
				{#each data.post.tags as tag}
					<li>
						<Tag {tag} />
					</li>
				{/each}
			</ul>
		</div>
	</footer>
{/if}
