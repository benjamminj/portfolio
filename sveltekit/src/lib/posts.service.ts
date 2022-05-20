import { z } from 'zod'
import fm from 'front-matter'
import { parseMarkdown } from './parse-markdown'
import { mapValues } from 'lodash'

import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
// import rehypeParse from 'rehype-parse'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { pruneAst } from './prune-hast'

const FormattedDateSchema = z.date().transform((date) => {
	const iso = date.toISOString()

	// We split the ISO string into its components using a regex to avoid timezone conversions
	// that occur when using date.getMonth, date.getDay, etc. This makes sure that the date
	// is stable (always in GMT timezone) regardless of where the build was run.
	const [y, m, d] = iso.split(/[-T]/)
	return [y, m?.padStart(2, '0'), d?.padStart(2, '0')].join('-')
})

const PostSchema = z
	.object({
		slug: z.string(),
		title: z.string(),
		date: FormattedDateSchema,
		lastUpdated: FormattedDateSchema.optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]),
		body: z.string(),
		ast: z.any()
	})
	.transform(({ lastUpdated, date, ...rest }) => ({ ...rest, date: lastUpdated ?? date }))

export type Post = z.infer<typeof PostSchema>

/**
 * Take the file path of a given blog post file and turn it into a "slug" that's URL-safe.
 */
const slugifyPostPath = (fullPath: string): string => {
	const [, path] = fullPath.split('/content/writing/')
	return path.replace('/index.md', '').replace(/\.md$/, '')
}

const __cached_posts__: Post[] = []

/**
 * Lists all posts available in the posts directory
 *
 * TODO:
 * This function needs to index the directory, slugify each post, and load it into
 * the array of posts.
 *
 * I'm almost wondering if it's "easier" to load all these posts into something like
 * SQLite, since we won't take a perf hit (they're all prerendered.)
 *
 * TODO: sorting / filtering?
 */
export const list = async () => {
	if (__cached_posts__.length > 0) {
		return __cached_posts__
	}

	const rawPosts = import.meta.glob('../../../content/writing/**/*', { as: 'raw' })

	const posts: Post[] = await Promise.all(
		Object.entries(rawPosts).map(async ([path, contents]) => {
			const { body, attributes } = fm<Record<string, unknown>>(contents as unknown as string)

			const ast = await parseMarkdown(body)
			const content = await unified()
				.use(remarkParse)
				.use(remarkRehype)
				// .use(rehypeParse)
				.use(rehypeStringify)
				.process(body)

			const pruned = pruneAst(ast)
			// console.log(content)
			return await PostSchema.parseAsync({
				slug: slugifyPostPath(path),
				...attributes,
				body: content.value,
				ast
			})
		})
	)

	posts.sort((a, b) => b.date.localeCompare(a.date))
	return posts
}

/**
 * Gets a single post by slug
 */
export const get = async (slug: string) => {
	const posts = await list()
	const post = posts.find((p) => p.slug === slug)
	return post
}
