import type { RequestHandler } from '@sveltejs/kit'
import * as PostsService from '$lib/posts.service'
import type { Post } from '$lib/posts.service'

export const get: RequestHandler = async () => {
	const posts = await PostsService.list()
	const slimmedPosts = posts.map(({ body: _body, ast: _ast, ...rest }) => rest)
	return {
		status: 200,
		body: {
			posts: slimmedPosts as Omit<Post, 'body' | 'ast'>[]
		}
	}
}
