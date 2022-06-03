import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { MarkdownRenderer } from '~/components/markdown-renderer'
import { readFile } from '~/lib/read-file.server'
import { processContent } from '~/lib/process-content'
import type { PrunedHast } from '~/lib/parse-markdown'
import { list } from '~/lib/posts.server'
import type { Post } from '~/lib/posts.server'
import { PostList } from '~/components/post-list'

type LoaderData = {
  title: string
  subtitle: string
  hast: PrunedHast
  recentPosts: Post[]
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'Benjamin Johnson — Principal Frontend Engineer',
    description:
      'Software engineer specializing in building front-end web apps.',
    keywords:
      'front-end engineer, web, javascript, typescript, react, accessibility',
  }
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const content = await readFile('intro.md')
  const { hast } = await processContent(content)
  const posts = await list()
  return {
    title: "Hi, I'm Ben!",
    subtitle: "I'm a frontend software engineer based out of Seattle",
    hast,
    recentPosts: posts.slice(0, 5),
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <>
      <MarkdownRenderer hast={data?.hast} />
      <PostList posts={data?.recentPosts} />
      <Link
        to="/writing"
        className="underline font-bold py-4 flex hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-50"
      >
        {/**
         * This is a spacer to make the "see more posts" text appear inline
         * with the `PostListItem` components.
         */}
        <span className="opacity-0 not-sr-only select-none w-[10ch]" />
        see all posts
      </Link>
    </>
  )
}
