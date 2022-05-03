import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request, params }) => {
	console.log('params >>', params);
	const res = await fetch('https://benjaminjohnson.me/' + '_next/' + params.path);
	return new Response(res.body, {
		...res
	});
};
