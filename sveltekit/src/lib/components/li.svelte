<li class="relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute">
	<slot />
</li>

<style>
	/* TODO: can I use the marker psuedoclass to do my styles instead of before / after? */
	li::marker,
	::marker {
		display: none !important;
	}
</style>
