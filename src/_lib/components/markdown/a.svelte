<script lang="ts">
	export let href: string;
</script>

<a {...$$restProps} {href} class="font-bold hover:text-gray-100">
	<slot />
</a>
