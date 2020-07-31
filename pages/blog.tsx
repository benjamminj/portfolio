import { jsx } from '@emotion/core'
import { compareAsc, format, compareDesc } from 'date-fns'
import fm from 'front-matter'
import fs from 'fs'
import { GetStaticProps } from 'next'
import path from 'path'
import readingTime from 'reading-time'
import { Heading, Layout, Link, Section } from '../src/components'
/** @jsx jsx */ jsx

interface PostPreview {
  /** The post title */
  title: string
  /** Brief description of the post used for previews */
  description: string
  /** The date that the post was first published. */
  date: string
  /** Whether or not the post is a WIP or not. */
  draft?: boolean
  /** If the post was externally published, the link to the original article */
  link?: string
  /** If the post was externally published, the name of the original publisher. */
  publisher?: string
  /** The `href` to the actual post itself */
  href: string
  /** An estimate of how long the post will take to read */
  readingTime: string
}

interface BlogPageProps {
  /** List of blog posts. */
  posts: PostPreview[]
}

const BlogPage = ({ posts }) => {
  return (
    <Layout>
      <Section
        css={{
          marginTop: '3rem',
          padding: 'var(--body-gutter)'
        }}
      >
        <Heading large className="pageHeading">
          <h1>Blog</h1>
        </Heading>

        <ul css={{ margin: '1rem 0' }}>
          {posts.map(post => (
            <li css={{ marginTop: '4rem' }} key={post.href}>
              <Heading css={{ margin: '0.75rem 0' }}>
                <h2>
                  <Link href="/blog/[slug]" as={post.href}>
                    {post.title}
                  </Link>
                </h2>
              </Heading>

              <p>{post.description}</p>

              <h3
                css={{
                  fontSize: '0.825rem',
                  margin: '1rem 0',
                  color: '#888',
                  fontFamily: 'var(--font-secondary)',
                  fontWeight: 'normal'
                }}
              >
                {post.date}
                {post.publisher && post.link && (
                  <span css={{ fontWeight: 'bold' }}>
                    {` on ${post.publisher}`}
                  </span>
                )}{' '}
                &mdash; {post.readingTime}
              </h3>
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // All of the posts are located within the `src/posts` directory.
  const basePath = './src/posts/'
  // Get a list of post file paths so that we can process them into the blog list.
  const rawPosts = fs.readdirSync(basePath)

  let posts = []
  for (let item of rawPosts) {
    const filePath = path.join(basePath, item)
    const { ext } = path.parse(filePath)

    if (
      ext.startsWith('.md') &&
      // Skip the `index` file
      ext !== 'index' &&
      // Skip the markdown test as well, it's not an actual post.
      !filePath.includes('posts/markdown-test')
    ) {
      try {
        const { attributes, ...rest } = fm<any>(
          fs.readFileSync(filePath, 'utf8')
        )

        // Don't add the post to the list if it's a WIP
        if (attributes.draft) continue

        const postData = {
          ...(attributes as object),
          href: filePath
            .replace(/^src\/posts/, '/blog')
            .replace(/\.mdx?$/, '')
            .replace(/\.tsx?$/, ''),
          readingTime: readingTime(rest.body).text
        }

        posts.push(postData)
      } catch (error) {
        console.log(`Error reading frontmatter of ${filePath}`, error)
      }
    }
  }

  const addDateFormattingToPost = p => ({
    ...p,
    date: format(p.date, 'MM-dd-yyyy')
  })

  return {
    props: {
      posts: posts
        .sort((a, b) => compareDesc(a.date, b.date))
        // We add the date formatting _after_ sorting so that we can accurately sort
        // by date.
        .map(addDateFormattingToPost)
    }
  }
}
export default BlogPage
