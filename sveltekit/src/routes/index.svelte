<script>
	let count = 0;
</script>

<h1>Welcome to SvelteKit ({count})</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button type="button" on:click={() => count++}>+1</button>

<style>
	button {
		color: black;
		background-color: red;
	}
</style>
