<script module lang="ts">
	import { createContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	let preContext = createContext<boolean>();
	const [getPreContextUnsafe, setPreContext] = preContext;
	export function getPreContext() {
		try {
			return getPreContextUnsafe();
		} catch (error) {
			return false;
		}
	}
</script>

<script lang="ts">
	type Props = HTMLAttributes<HTMLPreElement> & {
		children: Snippet;
	};
	const { children, ...properties }: Props = $props();
	setPreContext(true);
	const className =
		"relative p-line overflow-auto rounded-xs bg-gray-900 text-white";
</script>

<pre class={className} {...properties}>{@render children()}</pre>
