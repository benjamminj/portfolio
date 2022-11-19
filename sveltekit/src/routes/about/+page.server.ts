import { MarkdownService } from '$lib/markdown-service.server';
import { readFile } from '$lib/read-file';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const content = await readFile('about.md');
	const hast = await MarkdownService.parseMarkdownToHast(content);
	return {
		title: 'About me',
		hast
	};
};
