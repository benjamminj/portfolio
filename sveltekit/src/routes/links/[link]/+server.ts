import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const WEEK_IN_SECONDS = 604800;

const links = {
	email: 'mailto:benjamin.d.johnson@icloud.com',
	twitter: 'https://twitter.com/benjamminj'
};

export const GET: RequestHandler = async ({ request, params, setHeaders }) => {
	const { link } = params;

	if (link in links) {
		setHeaders({
			'Cache-Control': `max-age=${WEEK_IN_SECONDS}, s-maxage=${WEEK_IN_SECONDS}, must-revalidate`
		});
		throw redirect(302, links[link as keyof typeof links]);
	}

	throw error(404, 'Not found');
};
