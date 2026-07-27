<script lang="ts">
	import A from "$lib/a.svelte";
	import H from "$lib/h.svelte";
	import Tag from "$lib/tag.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div class="pb-line">
	<H level={1}>clippings</H>

	<p class="italic lowercase text-small text-fg-muted">
		Articles, blogs, and other links I've found interesting.
	</p>
</div>

<ul class="space-y-line">
	{#each data.clippings as clipping}
		<li>
			<A
				class="text-heading hover:underline"
				href={clipping.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{clipping.name}
			</A>

			{#if clipping.tags.length > 0}
				<div class="flex gap-x-ch flex-wrap">
					{#each clipping.tags as tag}
						<Tag {tag} />
					{/each}
				</div>
			{/if}
		</li>
	{/each}
</ul>
