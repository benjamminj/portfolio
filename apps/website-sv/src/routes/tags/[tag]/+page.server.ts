import { PostService } from "$lib/posts-service.server";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () => {
	const posts = await PostService.list();
	const tags = posts.flatMap((post) => post.tags);
	const unique = new Set(tags);

	return Array.from(unique).map((tag) => ({ tag }));
};

export const load: PageServerLoad = async ({ params }) => {
	const posts = await PostService.list();
	const tag = params.tag;
	const filtered = posts.filter((post) => post.tags.includes(tag));

	return { filtered };
};
