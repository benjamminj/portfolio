<script lang="ts">
	import Markdown from "$lib/components/markdown";
  import PostList from "$lib/components/post-list.svelte";
	import type { PageServerData } from "./$types";

  export let data: PageServerData
</script>

<Markdown hast={data.intro} />
<PostList posts={data.recentPosts} />  
<a href="/writing" class="underline font-bold py-4 flex hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-50">
  <!-- 
    This is a spacer to make the "see more posts" text appear inline
    with the `PostListItem` components. 
  -->
  <span class="opacity-0 not-sr-only select-none w-[10ch]" />
  see all posts
</a>
