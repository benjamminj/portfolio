<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import BackgroundCodePattern from "$lib/background-code-pattern.svelte";
	import A from "$lib/a.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="z-0 font-mono bg-bg text-fg text-body min-h-screen relative">
	<BackgroundCodePattern />

	<div class="p-line xl:p-line-2 2xl:p-line-3">
		<header>
			<A href="/" class="no-underline hover:underline lowercase text-heading">
				Benjamin Johnson
			</A>
		</header>

		<main class="pt-line-3">{@render children()}</main>
	</div>
</div>
