<script lang="ts">
	import { page } from '$app/stores'
	export let title: string | undefined = undefined

	// TODO: determine whether we need external properties (rel referrer)
	// based on the href itself
	export let href: string

	$: activeStyles =
		$page.url.pathname === href
			? 'text-black font-bold dark:text-white'
			: 'text-gray-800 font-normal dark:text-gray-200'
</script>

<a {href} {title} class="text-base no-underline {activeStyles}">
	<slot />
</a>
