import { PostService } from '$lib/posts-service.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { tag } = params;
	const posts = await PostService.list();
	const filtered = posts.filter((post) => post.tags.includes(tag));

	return {
		title: `#${tag}`,
		subtitle: `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`,
		posts: filtered
	};
};
