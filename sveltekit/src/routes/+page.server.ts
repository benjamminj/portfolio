import { PostService } from '$lib/posts.server';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ request }) => {
	const posts = await PostService.list();
	console.log(posts);
	return { woo: 'woo', recentPosts: posts.slice(0, 5) };
};
