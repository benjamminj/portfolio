import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { get } from '~/lib/posts.server'

import type { Post } from '~/lib/posts.server'
import type { LoaderFunction } from '@remix-run/node'
import { MarkdownRenderer } from '~/components/markdown-renderer'
import { Tag } from '~/components/tag'

type LoaderData = {
  post: Post
}

export const loader: LoaderFunction = async ({ params }) => {
  const slug = z.string().parse(params.slug)
  const post = await get(slug)
  // TODO: redirect to 404 on missing post...
  return { title: post?.title, subtitle: post?.date, post }
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
