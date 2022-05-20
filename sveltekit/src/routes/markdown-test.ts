import { parseMarkdown } from '$lib/parse-markdown'
import { pruneAst } from '$lib/prune-hast'
import type { RequestHandler } from '@sveltejs/kit'
import fm from 'front-matter'

export const get: RequestHandler = async () => {
	const map = import.meta.glob('../../../content/markdown-test.md', { as: 'raw' })

	const [content] = Object.values(map)
	const { body } = await fm<unknown>(content as unknown as string)
	const ast = await parseMarkdown(body as unknown as string)
	const pruned = pruneAst(ast)
	return {
		body: { content: pruned }
	}
}
