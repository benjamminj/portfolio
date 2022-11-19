<script lang="ts">
	import Markdown from '$lib/components/markdown';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<Markdown hast={data?.hast} />