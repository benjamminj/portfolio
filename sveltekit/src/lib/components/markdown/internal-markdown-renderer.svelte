<script lang="ts">
	import type { HtmlAstNode } from "$lib/hast.types";
	import A from "./a.svelte";
	import CodeBlock from "./code-block.svelte";
	import Heading from "./heading.svelte";
  export let nodes: HtmlAstNode[] = []; 
</script>

{#each nodes as node}
  {#if node.type === 'heading'}
    <Heading level={node.depth}><svelte:self nodes={node.children} /></Heading>
  {:else if node.type === 'text'}
    {node.value}
  {:else if node.type === 'paragraph'}
    <p class="mb-6 text-base leading-7">
      <svelte:self nodes={node.children} />
    </p>
  {:else if node.type === 'link'}
    <A href={node.url}>
      <svelte:self nodes={node.children} />
    </A>
  {:else if node.type === 'thematicBreak'}
    <hr class="relative h-auto my-16 font-mono tracking-tighter text-center border-none before:content-['*_*_*'] before:text-lg dark:text-gray-400" />
  {:else if node.type === 'strong'}
    <strong><svelte:self nodes={node.children} /></strong>
  {:else if node.type === 'emphasis'}
    <em><svelte:self nodes={node.children}/></em>
  {:else if node.type === 'list' && node.ordered}
    <ol class="pl-8 list-none">
      <svelte:self nodes={node.children} />
    </ol>
  {:else if node.type === 'list' && !node.ordered}
    <ul class="pl-6 list-none">
      <svelte:self nodes={node.children} />
    </ul>
  {:else if node.type === 'listItem'}
    <li class="relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute">
      <svelte:self nodes={node.children} />
    </li>
  {:else if node.type === 'blockquote'}
    <blockquote>
      <svelte:self nodes={node.children} />
    </blockquote>
  {:else if node.type === 'inlineCode'}
    <code class="bg-gray-100 dark:bg-gray-700 p-1 break-words">
      {node.value}
    </code>
  {:else if node.type === 'code'}
    <CodeBlock code={node.value} />
  {:else if node.type === 'image'}
    <img src={node.url} alt={node.alt} />
  {/if}
{/each}