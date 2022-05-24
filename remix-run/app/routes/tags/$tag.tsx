import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { PostListItem } from '~/components/post-list-item'
import { list } from '~/lib/posts.server'
import type { Post } from '~/lib/posts.server'

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
    description: `All posts categorized with "${data.tag}"`,
  }
}

type LoaderData = {
  title: string
  posts: Post[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const tag = z.string().parse(params.tag)
  const posts = await list()
  const filtered = posts.filter((post) => post.tags?.includes(tag))
  return {
    title: `#${tag}`,
    subtitle: `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`,
    posts: filtered,
  }
}

export default function TagRoute() {
  const data = useLoaderData<LoaderData>()
  return (
    <main>
      <ul className="space-y-2">
        {data?.posts.map((post) => (
          <li className="w-full" key={post.slug}>
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
    </main>
  )
}
