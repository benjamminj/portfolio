import { PostService } from '$lib/posts-service.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, params }) => {
	const { slug } = params;
	const post = await PostService.get(slug);
	return { post };
};
