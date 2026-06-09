import { PostService, transformToAst } from "$lib/posts-service.server";
import { readFile } from "$lib/read-file";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const md = await readFile("markdown-test.md");
	const ast = await transformToAst(md);

	return { ast };
};
