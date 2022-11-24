import { PostService } from '$lib/posts-service.server';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const post = await PostService.get(slug);
	return {
		post,
		title: post.title,
		subtitle: post.date,
		slug,
		HOMEPAGE: env.URL || env.VERCEL_URL
	};
};
