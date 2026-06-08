<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import BackgroundCodePattern from "$lib/background-code-pattern.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="font-mono bg-bg text-fg text-body min-h-screen relative">
	<BackgroundCodePattern />

	{@render children()}
</div>

<style>
	/* jetbrains-mono-latin-wght-normal */
	@font-face {
		font-family: "JetBrains Mono Variable";
		font-style: normal;
		font-display: swap;
		font-weight: 100 800;
		src: url(@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2)
			format("woff2-variations");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
			U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191,
			U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	/* jetbrains-mono-latin-wght-italic */
	@font-face {
		font-family: "JetBrains Mono Variable";
		font-style: italic;
		font-display: swap;
		font-weight: 100 800;
		src: url(@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-italic.woff2)
			format("woff2-variations");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
			U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191,
			U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	:global(:root) {
		--font-jetbrains-mono: "JetBrains Mono Variable", monospace;
	}
</style>
