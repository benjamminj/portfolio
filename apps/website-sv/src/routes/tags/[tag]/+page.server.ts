import { PostService } from "$lib/posts-service.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const posts = await PostService.list();
	const tag = params.tag;
	const filtered = posts.filter((post) => post.tags.includes(tag));

	return { filtered };
};
