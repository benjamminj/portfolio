import type { RequestHandler } from '@sveltejs/kit'
import { list, type Post } from '$lib/posts.service'

export const get: RequestHandler = async ({ params }) => {
	const tag = params.tag
	// TODO: move filtering into the service itself?? This would allow a single endpoint
	// to be used to fetch posts on both the writing page and the tags page...and may
	// allow future features like search + filter on the writing page.
	const posts = await list()

	const slimmedPosts = posts
		.map(({ body: _, ...rest }) => rest)
		.filter((post) => post.tags.includes(tag))

	return {
		status: 200,
		body: {
			posts: slimmedPosts as Omit<Post, 'body'>[]
		}
	}
}
