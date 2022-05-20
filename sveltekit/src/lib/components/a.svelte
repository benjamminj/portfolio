<script lang="ts">
	export let href: string
</script>

<a
	{href}
	class="inline px-0.5 font-medium text-gray-500 underline bg-transparent hover:text-gray-600 dark:text-gray-300 dark:hover:text-white dark:hover:border-white"
>
	<slot />
</a>
