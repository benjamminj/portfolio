<script lang="ts">
    import Markdown from '$lib/components/markdown';
    import type { PageData } from './$types';
    
    export let data: PageData;
    $: console.log(data.post)
</script>

<Markdown hast={data.post.content} />