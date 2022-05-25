import { HtmlMetaDescriptor, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { get } from '~/lib/posts.server'

import type { Post } from '~/lib/posts.server'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { MarkdownRenderer } from '~/components/markdown-renderer'
import { Tag } from '~/components/tag'

export const meta: MetaFunction = ({ data }) => {
  const metadata: HtmlMetaDescriptor = {
    title: data.title,
    description: data.post.description,
    author: 'Benjamin Johnson',
    'twitter:card': 'summary',
    'twitter:site': '@benjamminj',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:creator': '@benjamminj',
    'og:title': data.title,
    'og:description': data.post.description,
    'og:type': 'website',
    'og:url': `${data.HOMEPAGE}/${data.slug}`,
  }

  if (data?.post?.tags?.length > 0) {
    metadata['keywords'] = data.post.tags.join(', ')
  }

  return metadata
}

type LoaderData = {
  title: string
  subtitle: string
  post: Post
  slug: string
  HOMEPAGE?: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const slug = z.string().parse(params.slug)
  const post = await get(slug)
  // TODO: redirect to 404 on missing post...
  return {
    title: post?.title,
    subtitle: post?.date,
    post,
    slug,
    HOMEPAGE: process.env.URL || process.env.VERCEL_URL,
  }
}

export default function SlugRoute() {
  const data = useLoaderData<LoaderData>()
  return (
    <main>
      <MarkdownRenderer hast={data?.post.content} />

      {data?.post.tags?.length > 0 && (
        <footer data-testid="SlugPage__footer" className="py-12">
          <div>
            <div className="font-mono dark:text-gray-400">Tags</div>
            <ul className="dark:text-gray-200 flex space-x-2">
              {data?.post.tags?.map((tag) => (
                <li key={tag}>
                  <Tag tag={tag} />
                </li>
              ))}
            </ul>
          </div>
        </footer>
      )}
    </main>
  )
}
