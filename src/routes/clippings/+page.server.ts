import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { default: clippings } = await import('../../../content/clippings.json');
	return {
		title: 'Clippings',
		subtitle: "Articles, blogs, and other links I've found interesting.",
		clippings
	};
};
