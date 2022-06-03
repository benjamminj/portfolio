import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { PostList } from '~/components/post-list'
import type { Post } from '~/lib/posts.server'
import { list } from '~/lib/posts.server'

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
  return {
    title: 'Writing',
    subtitle: `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`,
    posts: posts,
  }
}

export default function WritingRoute() {
  const data = useLoaderData<LoaderData>()
  return (
    <main>
      <PostList posts={data?.posts} />
    </main>
  )
}
