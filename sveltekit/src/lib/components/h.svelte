<script lang="ts">
	export let level: number = 2
	let normalizedLevel = Math.max(Math.min(level, 6), 1)
	let tag = `h${normalizedLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

	let styles = {
		h1: '',
		h2: 'mt-16 mb-6 text-3xl',
		h3: 'mt-12 mb-4 text-2xl',
		h4: 'mt-10 mb-4 text-xl',
		h5: 'mt-6 mb-4 text-lg',
		h6: 'mt-6 mb-4 text-base'
	}
</script>

<svelte:element this={tag} class="{styles[tag]} font-medium"><slot /></svelte:element>
