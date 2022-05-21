import { z } from 'zod'
import fm from 'front-matter'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseMarkdown } from './parse-markdown'
import { processContent } from './process-content'

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
    // TODO: HAST type...
    content: z.any(),
  })
  .transform(({ lastUpdated, date, ...rest }) => ({
    ...rest,
    date: lastUpdated ?? date,
  }))

export type Post = z.infer<typeof PostSchema>

/**
 * Take the file path of a given blog post file and turn it into a "slug" that's URL-safe.
 */
const slugifyPostPath = (file: string): string => {
  // const [, path] = fullPath.split('/content/writing/')
  return file.replace('/index.md', '').replace(/\.md$/, '')
}

let __cached_posts__: Post[] = []

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

  const postPaths = await fs.readdir(path.join(__dirname, './content/writing/'))

  const promises = []
  for (const filePath of postPaths) {
    const promise = async () => {
      const contents = await fs.readFile(
        path.join(__dirname, './content/writing', filePath),
        'utf8'
      )
      return [filePath, contents]
    }

    promises.push(promise())
  }

  const rawPosts = await Promise.all(promises)

  const posts: Post[] = await Promise.all(
    rawPosts.map(async ([path, contents]) => {
      const { hast, ...attributes } = await processContent(contents)
      return await PostSchema.parseAsync({
        slug: slugifyPostPath(path),
        ...attributes,
        body: 'TBD',
        content: hast,
      })
    })
  )

  posts.sort((a, b) => b.date.localeCompare(a.date))
  __cached_posts__ = posts
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
