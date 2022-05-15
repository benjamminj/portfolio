import { parseMarkdown } from '$lib/parse-markdown'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
	const map = import.meta.glob('../../../content/markdown-test.md', { as: 'raw' })

	const [content] = Object.values(map)
	const html = await parseMarkdown(content as unknown as string)
	return {
		body: { content: html }
	}
}
