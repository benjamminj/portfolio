import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
	const res = await fetch(import.meta.env.VITE_URL + '/' + params.path)
	return new Response(res.body, { ...res })
}
