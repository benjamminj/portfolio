import type { RequestHandler } from '@sveltejs/kit'
import * as PostsService from '$lib/posts.service'

export const get: RequestHandler = async ({ params }) => {
	const post = await PostsService.get(params.path)

	// console.log(post)

	// const res = await fetch(import.meta.env.VITE_URL + '/' + params.path)
	// // `res` needs to be spread into a new object or else the serializer won't properly
	// // proxy the request as HTML.
	// return new Response(res.body, { ...res })
	return {
		body: {
			post
		}
	}
}
