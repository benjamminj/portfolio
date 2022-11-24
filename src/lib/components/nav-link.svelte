<script lang="ts">
	import { page } from '$app/stores';
	import clsx from 'clsx';

	export let href: string;
	export let title: string;

	$: isActive = $page.url.pathname === href;
</script>

<a
	{href}
	{title}
	class={clsx(
		'text-base underline',
		isActive
			? 'text-black font-bold dark:text-white'
			: 'text-gray-800 font-normal dark:text-gray-200'
	)}
>
	<slot />
</a>
