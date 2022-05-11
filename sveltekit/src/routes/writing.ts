import type { RequestHandler } from '@sveltejs/kit'
import { list, type Post } from '$lib/posts.service'

export const get: RequestHandler = async () => {
	const posts = await list()
	const slimmedPosts = posts.map(({ body: _, ...rest }) => rest)
	return {
		status: 200,
		body: {
			posts: slimmedPosts as Omit<Post, 'body'>[]
		}
	}
}
