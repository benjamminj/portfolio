import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
	const res = await fetch(import.meta.env.VITE_URL + '/' + params.path)
	const headers = new Headers(res.headers)
	headers.append('content-type', 'text/html; charset=utf-8')
	return new Response(res.body, {
		...res,
		headers
	})
}
