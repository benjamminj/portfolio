import { z } from 'zod'
import type { ZodTypeAny } from 'zod'
import { processContent } from './process-content'
import { posts as content } from '~/generated/posts.generated.server'
import fm from 'front-matter'
import { parseMarkdownToHTML } from './parse-markdown'

/**
 * Parses a date object into a JSON-serializable string, formatted as yyyy-mm-dd.
 */
const FormattedDateSchema = z.date().transform((date) => {
  const iso = date.toISOString()

  // We split the ISO string into its components using a regex to avoid timezone conversions
  // that occur when using date.getMonth, date.getDay, etc. This makes sure that the date
  // is stable (always in GMT timezone) regardless of where the build was run.
  const [y, m, d] = iso.split(/[-T]/)
  return [y, m?.padStart(2, '0'), d?.padStart(2, '0')].join('-')
})

/**
 * All of the metadata about the blog post. This mostly comes from the front-matter
 * of the file, but some items can be derived from the file name.
 */
const PostMetadataSchema = z
  .object({
    slug: z.string(),
    title: z.string(),
    date: FormattedDateSchema,
    lastUpdated: FormattedDateSchema.optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    link: z.string().optional(),
    publisher: z.string().optional(),
  })
  .transform(({ lastUpdated, date, ...rest }) => ({
    ...rest,
    date: lastUpdated ?? date,
  }))

/**
 * The post content itself, parsed into a HTML AST. This schema should usually be
 * composed with the metadata schema to create a full "Post" object.
 */
const PostContentSchema = z.object({
  // @todo: This should be the type of the HAST, but since that's recursive you
  // can easily get into an infinite parsing loop.
  content: z.any(),
})

/**
 * A single post, with metadata and parsed HAST content.
 */
const PostSchema = z.intersection(PostContentSchema, PostMetadataSchema)

export type Post = z.infer<typeof PostSchema>
export type PostMetadata = z.infer<typeof PostMetadataSchema>
export type PostContent = z.infer<typeof PostContentSchema>

/**
 * Take the file path of a given blog post file and turn it into a "slug" that's URL-safe.
 */
const slugifyPostPath = (file: string): string => {
  // const [, path] = fullPath.split('/content/writing/')
  return file.replace('/index.md', '').replace(/\.md$/, '')
}

/**
 * Lists all posts available in the posts directory
 *
 * Right now this function reads the posts into memory from the generated file, which
 * isn't ideal but also gets around having to babysit a database connection.
 *
 * TODO: sorting / filtering?
 */
export const list = async ({
  include = [],
}: { include?: 'html'[] } = {}): Promise<
  (PostMetadata & { html?: string })[]
> => {
  // First, load all the content into memory, and filter them down to only the ones
  // under `writing`
  const rawPosts = Object.entries(content)
    .filter(([k]) => k.includes('/writing/'))
    .map(([k, v]) => [k.replace('content/writing/', ''), v]) as string[][]

  // Then, for each post, parse the front-matter. We don't need to parse the post itself
  // at this point, just the metadata and the key (slug).
  const posts: PostMetadata[] = await Promise.all(
    rawPosts.map(async ([path, contents]) => {
      // NOTE: we should stop processing the content here, this will automagically
      // allow us to prune the posts and will also be good prep for Cloudflare KV
      // if we decide to go that route.
      const { attributes, body } = fm<Record<string, string>>(contents)
      const payload: Record<string, unknown> = {
        slug: slugifyPostPath(path),
        ...attributes,
      }

      let schema: ZodTypeAny = PostMetadataSchema
      if (include.includes('html')) {
        schema = z.intersection(
          PostMetadataSchema,
          z.object({ html: z.string() })
        )
        payload.html = await parseMarkdownToHTML(body)
      }

      return await schema.parseAsync(payload)
    })
  )

  // Sort posts by date, newest first.
  posts.sort((a, b) => b.date.localeCompare(a.date))
  return posts
}

/**
 * Gets a single post along with its metadata by slug
 */
export const get = async (slug: string) => {
  const index = Object.keys(content).find((k) => k.includes(`/writing/${slug}`))
  const post = content[index as keyof typeof content]
  const { hast, ...attributes } = await processContent(post)
  return await PostSchema.parseAsync({
    slug,
    ...attributes,
    content: hast,
  })
}
