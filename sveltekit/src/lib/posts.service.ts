import { z } from 'zod'
import { Remarkable } from 'remarkable'
import fm from 'front-matter'

const md = new Remarkable()

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
		body: z.string()
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

const parsePostBody = async (content: string) => {
	// TODO: plugin to add the copy-pasta button for code blocks
	// TODO: how to style all my stuff? Just w/ raw CSS?
	// TODO: how to replace an element w/ a Svelte component
	const parsed = await md.render(content)
	return parsed
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
 * TODO: memoize to make things easier? Since this one will get hit a lot until we
 * switch to a fully DB-driven flow w/ "primary keys".
 */
export const list = async () => {
	if (__cached_posts__.length > 0) {
		return __cached_posts__
	}

	const rawPosts = import.meta.glob('../../../content/writing/**/*', { as: 'raw' })

	const posts: Post[] = await Promise.all(
		Object.entries(rawPosts).map(async ([path, contents]) => {
			const { attributes, body } = fm<Record<string, unknown>>(contents as unknown as string)

			const parsed = await parsePostBody(body)
			return await PostSchema.parseAsync({
				slug: slugifyPostPath(path),
				...attributes,
				body: parsed
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
