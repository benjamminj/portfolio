import { jsx } from '@emotion/core'
import { compareDesc, format } from 'date-fns'
import { GetStaticProps } from 'next'
import { getPostBySlug } from '../lib/getPostBySlug'
import { getPostFilePaths } from '../lib/getPostFilePaths'
import { slugifyPost } from '../lib/slugifyPost'
import { PostFrontmatter } from '../lib/types'
import { Heading } from '../components/Heading'
import { Layout, LayoutV2 } from '../components/Layout'
import { PostListItem } from '../components/PostListItem'
import { Text } from '../components/Text'
import { Box as DeprecatedBox } from '../components/Box'
import { textMaxWidth } from '../styles/variables'
import { fontSizes, palette, radius, spacing, Theme } from '../styles/theme'
import styled from '@emotion/styled'
import { color, space, layout, ColorProps, LayoutProps } from 'styled-system'
import { Box } from '../components/Box.v2'
import { Stack } from '../components/Stack'
import { ReactNode } from 'react'

/** @jsxImportSource @emotion/core */ jsx

type PostPreview = Pick<
  PostFrontmatter,
  'title' | 'description' | 'draft' | 'link' | 'publisher' | 'tags'
> & {
  /** The `href` to the actual post itself */
  href: string
  /** An estimate of how long the post will take to read */
  readingTime: string
  date: string
}

interface BlogPageProps {
  /** List of blog posts. */
  posts: PostPreview[]
}

interface PostPreviewCardProps {
  post: PostPreview
}

const PostPreviewCard = ({ post }: PostPreviewCardProps) => {
  return (
    <div className="p-8 bg-gray-800 rounded-2xl">
      <div className="space-y-4">
        <h2 className="text-2xl">
          <a
            href={post.href}
            title={post.title}
            className="no-underline text-gray-200"
          >
            {post.title}
          </a>
        </h2>

        {post.description && <p className="leading-7">{post.description}</p>}
      </div>
    </div>
  )
}

/** Displays a list of all published writings. */
const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <LayoutV2 title="Writing" subtitle="subtitle TODO">
      <ul>
        <div className="space-y-4">
          {posts.map(post => {
            console.log('post>>', post)
            return (
              <li key={post.href} className="w-full">
                <PostPreviewCard post={post} />
              </li>
            )
          })}
        </div>
      </ul>
    </LayoutV2>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postFiles = getPostFilePaths()

  let posts = []

  for (let postFile of postFiles) {
    try {
      const slug = slugifyPost(postFile)
      const { frontmatter } = getPostBySlug(slug)

      // Don't add the post to the list if it's a WIP
      if (frontmatter.draft) continue

      const postData = {
        ...frontmatter,
        href: `/blog/${slug}`,
      }

      posts.push(postData)
    } catch (error) {
      console.log(`Error reading frontmatter of ${postFile}`, error)
    }
  }

  const sortedPosts = posts
    .sort((a, b) => compareDesc(a.date, b.date))
    .map(p => ({ ...p, date: format(p.date, 'yyyy-MM-dd') }))

  return { props: { posts: sortedPosts } }
}

export default BlogPage
