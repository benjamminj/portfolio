import { jsx } from '@emotion/core'
import { compareDesc, format } from 'date-fns'
import { GetStaticProps } from 'next'
import { getPostBySlug } from '../lib/getPostBySlug'
import { getPostFilePaths } from '../lib/getPostFilePaths'
import { slugifyPost } from '../lib/slugifyPost'
import { PostFrontmatter } from '../lib/types'
import { Heading } from '../components/Heading'
import { Layout } from '../components/Layout'
import { PostListItem } from '../components/PostListItem'
import { Text } from '../components/Text'
import { Box } from '../components/Box'
import { textMaxWidth } from '../styles/variables'
/** @jsxImportSource @emotion/core */ jsx

type PostPreview = Pick<
  PostFrontmatter,
  'title' | 'description' | 'draft' | 'link' | 'publisher' | 'tags' | 'date'
> & {
  /** The `href` to the actual post itself */
  href: string
  /** An estimate of how long the post will take to read */
  readingTime: string
}

interface BlogPageProps {
  /** List of blog posts. */
  posts: PostPreview[]
}

/** Displays a list of all published writings. */
const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <Layout>
      <Box
        component="section"
        padding="gutter"
        paddingTop="xxl"
        css={{ maxWidth: textMaxWidth, margin: '0 auto' }}
      >
        <Heading>
          <h1>
            <Text variant="h3">Blog</Text>
          </h1>
        </Heading>

        <Box component="ul" paddingBottom="m">
          {posts.map(post => (
            <li key={post.href}>
              <PostListItem
                title={post.title}
                date={format(post.date, 'yyyy-MM-dd')}
                tags={post.tags}
                href={post.href}
              />
            </li>
          ))}
        </Box>
      </Box>
    </Layout>
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

  const sortedPosts = posts.sort((a, b) => compareDesc(a.date, b.date))

  return { props: { posts: sortedPosts } }
}

export default BlogPage
