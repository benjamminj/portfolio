<script lang="ts">
	type Props = {
		tag: string;
	};
	let { tag }: Props = $props();
</script>

<a
	href={`/tags/${tag}`}
	class="inline-block text-small text-fg-muted underline hover:text-fg transition-colors duration-75"
>
	#{tag}
</a>
