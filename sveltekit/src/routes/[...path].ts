import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
	const res = await fetch(import.meta.env.VITE_URL + '/' + params.path)
	// `res` needs to be spread into a new object or else the serializer won't properly
	// proxy the request as HTML.
	return new Response(res.body, { ...res })
}
