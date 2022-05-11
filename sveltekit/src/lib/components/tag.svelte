<script lang="ts" context="module">
	export enum TagType {
		LINK = 'link',
		TEXT = 'text'
	}
</script>

<script lang="ts">
	export let tag: string
	export let type: TagType = TagType.LINK

	const tagStyles =
		'inline-block p-1 -m-1 font-mono text-xs text-gray-600 no-underline rounded dark:text-gray-400'

	const tagText = `#${tag}`
</script>

{#if type === TagType.LINK}
	<a
		href="/tags/{tag}"
		class="{tagStyles} hover:text-gray-800 hover:bg-gray-100 hover:underline dark:hover:text-gray-50 dark:hover:bg-gray-900"
		>{tagText}</a
	>
{:else if type === TagType.TEXT}
	<span class={tagStyles}>{tagText}</span>
{/if}
