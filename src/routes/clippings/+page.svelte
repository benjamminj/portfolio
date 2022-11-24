<script lang="ts">
	import A from '$lib/components/markdown/a.svelte';
	import Tag from '$lib/components/tag.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="prose dark:prose-invert max-w-none">
	<table>
		<thead>
			<tr class="font-bold text-lg">
				<td>Link</td>
				<td>Tags</td>
			</tr>
		</thead>
		<tbody data-testid="Clippings__tablebody">
			{#each data.clippings as clipping}
				<tr>
					<td class="w-3/5">
						<A href={clipping.url}>{clipping.name}</A>
					</td>
					<td class="flex gap-2 flex-wrap">
						{#each clipping.tags as tag}
							<Tag variant="strong" {tag} />
						{/each}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
