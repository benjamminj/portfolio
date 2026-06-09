<script lang="ts">
	import type { Parent } from "mdast";
	import A from "./a.svelte";

	type Props = {
		ast: Parent;
	};
	let { ast }: Props = $props();
</script>

{#snippet renderNode(ast: Parent)}
	{#each ast.children as node}
		{#if node.type === "paragraph"}
			<p>{@render renderNode(node)}</p>
		{:else if node.type === "heading"}
			<!-- TODO: dynamic H tag -->
			<h2>
				{@render renderNode(node)}
			</h2>
		{:else if node.type === "link"}
			<A href={node.url}>
				{@render renderNode(node)}
			</A>
		{:else if node.type === "text"}
			{node.value}
		{/if}
	{/each}
{/snippet}

<div class="text-body mx-0 max-w-prose px-0 space-y-line">
	{@render renderNode(ast)}
</div>
