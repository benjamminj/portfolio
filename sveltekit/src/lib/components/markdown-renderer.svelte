<script lang="ts">
	import type { HtmlAstNode } from '$lib/prune-hast'
	import A from './a.svelte'
	import Blockquote from './blockquote.svelte'
	import CodeBlock from './code-block.svelte'
	import H from './h.svelte'
	import InlineCode from './inline-code.svelte'
	import Li from './li.svelte'
	import Ol from './ol.svelte'
	import Ul from './ul.svelte'

	export let content: HtmlAstNode[]
	console.log(content)
</script>

<!-- TODO: key?? -->
{#each content as node}
	{#if node.type === 'text'}
		{node.value}
	{:else if node.type === 'paragraph'}
		<p class="mb-6 text-base leading-7">
			<svelte:self content={node.children} />
		</p>
	{:else if node.type === 'link'}
		<A href={node.url}><svelte:self content={node.children} /></A>
	{:else if node.type === 'heading'}
		<H level={node.depth}><svelte:self content={node.children} /></H>
	{:else if node.type === 'thematicBreak'}
		<hr
			class="relative h-auto my-16 font-mono tracking-tighter text-center border-none before:content-['*_*_*'] before:text-lg dark:text-gray-400"
		/>
	{:else if node.type === 'strong'}
		<strong><svelte:self content={node.children} /></strong>
	{:else if node.type === 'emphasis'}
		<em><svelte:self content={node.children} /></em>
	{:else if node.type === 'list'}
		{#if node.ordered}
			<Ol><svelte:self content={node.children} /></Ol>
		{:else}
			<Ul><svelte:self content={node.children} /></Ul>
		{/if}
	{:else if node.type === 'listItem'}
		<Li>
			<svelte:self content={node.children} />
		</Li>
	{:else if node.type === 'blockquote'}
		<Blockquote><svelte:self content={node.children} /></Blockquote>
	{:else if node.type === 'inlineCode'}
		<InlineCode>{node.value}</InlineCode>
	{:else if node.type === 'code'}
		<CodeBlock code={node.value} />
	{:else if node.type === 'image'}
		<img src={node.url} alt={node.alt} />
	{/if}
{/each}
