import { PostService, transformToAst } from "$lib/posts-service.server";
import { readFile } from "$lib/read-file";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const posts = await PostService.list();
	return { posts };
};
