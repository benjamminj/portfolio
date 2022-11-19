import { MarkdownService } from '$lib/markdown-service.server';
import { PostService } from '$lib/posts-service.server';
// import { readFile } from 'fs-extra';
import { readFile } from '$lib/read-file';
import type { PageServerLoad } from './$types';

// export const prerender = true;

export const load: PageServerLoad = async () => {
	const [posts, introRaw] = await Promise.all([PostService.list(), readFile('intro.md')]);
	const intro = MarkdownService.parseMarkdownToHast(introRaw);

	return {
		recentPosts: posts.slice(0, 5),
		intro,
		title: "Hi, I'm Ben!",
		subtitle: "I'm a frontend software engineer based out of Seattle"
	};
};
