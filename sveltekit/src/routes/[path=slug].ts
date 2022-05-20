import type { RequestHandler } from '@sveltejs/kit'
import * as PostsService from '$lib/posts.service'

// Next.js w/ MDX = 4.4kb (index.js)
// w/ HTML + AST = 4kb (index.js)
// HTML only = 1.1kb
// HAST only = 4kb
// pruned HAST only = 1.8kb

// w/ HTML only = ~16kb (how TW converted me)
// w/ HAST only = ~70kb (how TW converted me)
// w/ pruned HAST = ~27KB

export const get: RequestHandler = async ({ params }) => {
	const post = await PostsService.get(params.path)

	if (!post) throw new Error('404')

	const { body: _body, ...rest } = post
	return {
		body: {
			post: rest
		}
	}
}
