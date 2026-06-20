<script lang="ts">
	import type { CalloutVariant } from "./callout.svelte";

	import type { Element, Root } from "hast";
	import A from "./a.svelte";
	import Callout from "./callout.svelte";
	import H, { type HLevel } from "./h.svelte";
	import Pre from "./pre.svelte";
	import Code from "./code.svelte";

	type Props = {
		ast: Root;
	};
	let { ast }: Props = $props();
</script>

{#snippet renderNode(ast: Element)}
	{#each ast.children as node}
		{#if node.type === "text"}
			{node.value}
		{:else if (node.type === "comment")}
		  <!-- 
				Don't render comments, we need to check this logical branch for the rest of
				the renderer to be typesafe.
			-->
		{:else if (node.type === "raw")}
			{@html node.value}
		{:else if node.tagName === "ol"}
			<ol
				class="my-line list-decimal [&_ol]:list-[lower-alpha] pl-7 space-y-line"
			>
				{@render renderNode(node)}
			</ol>
		{:else if node.tagName === "ul"}
			<ul
				class="my-line list-disc [&_ul]:list-[circle] pl-5 [&_li]:pl-2 space-y-line"
			>
				{@render renderNode(node)}
			</ul>
		{:else if node.tagName === "a"}
			<A href={node.properties.href as string}>
				{@render renderNode(node)}
			</A>
		{:else if ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)}
				{const level = parseInt(node.tagName[1]) as HLevel}
				<H level={level} variant="prefixed">
					{@render renderNode(node)}
				</H>
		{:else if node.tagName === 'blockquote'}
			{#if node.properties?.["data-variant"]}
				{const variant = $derived(
					node.properties["data-variant"] as CalloutVariant,
				)}

				<Callout variant={variant}>
					{@render renderNode(node)}
				</Callout>
			{:else}
			  <blockquote
					class="my-line px-4 italic bg-bg-muted/40 backdrop-blur-[1px] border-l-4 border-l-border ring-1 ring-inset ring-bg-muted rounded-xs rounded-l-[1px] space-y-line py-line"
				>
					{@render renderNode(node)}
				</blockquote>
			{/if}
		{:else if node.tagName === 'pre'}
			<Pre {...node.properties}>{@render renderNode(node)}</Pre>
		{:else if node.tagName === 'code'}
			<Code>{@render renderNode(node)}</Code>
		{:else if node.tagName === 'hr'}
			<hr class="relative h-auto my-line-2 text-center text-fg-muted border-none before:content-['*_*_*'] before:text-heading" />
		{:else if node.tagName === 'table'}
			<table class="border">{@render renderNode(node)}</table>
		{:else if node.tagName === 'thead'}
			<thead class="group/thead">{@render renderNode(node)}</thead>
		{:else if node.tagName === 'td'}
			<td class="border-collapse border align-baseline py-[calc(var(--line-height-base)/2-0.5px)] px-3">
				{@render renderNode(node)}
			</td>
		{:else if node.tagName}
			{#if node.children && node.children.length > 0}
				<svelte:element this={node.tagName} {...node.properties}>
					{@render renderNode(node)}
				</svelte:element>
			{:else}
				<svelte:element this={node.tagName} {...node.properties} />
			{/if}
		{/if}
	{/each}
{/snippet}

<div class="text-body mx-0 max-w-prose px-0 space-y-line">
	{@render renderNode(ast as unknown as Element)}
</div>
