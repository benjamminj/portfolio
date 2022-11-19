import { PostService } from '$lib/posts-service.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await PostService.list();
	return {
		posts
	};
};
