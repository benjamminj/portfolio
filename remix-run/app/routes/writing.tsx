import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { PostListItem } from '~/components/post-list-item'
import { list } from '~/lib/posts.server'
import type { Post } from '~/lib/posts.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Writing',
  }
}

type LoaderData = {
  title: string
  posts: Post[]
}

export const loader: LoaderFunction = async () => {
  const posts = await list()
  const pruned = posts.map(({ content, ...rest }) => rest)
  return {
    title: 'Writing',
    subtitle: `${pruned.length} ${pruned.length === 1 ? 'post' : 'posts'}`,
    posts: pruned,
  }
}

export default function WritingRoute() {
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
