<script lang="ts">
	import type { HtmlAstNode } from "$lib/hast.types";
	import type { PrunedHast } from "$lib/markdown-service.server";
	import InternalMarkdownRenderer from "./internal-markdown-renderer.svelte";


  export let hast: PrunedHast | undefined = undefined;
	const children = hast?.children as HtmlAstNode[]
</script>

{#if hast}
	<div class="prose dark:prose-invert font-mono mx-auto max-w-prose">
		<InternalMarkdownRenderer nodes={children} />
	</div>
{/if}