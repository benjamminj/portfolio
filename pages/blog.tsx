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
  title: string
  description: string
  date: string
  draft?: boolean
  image?: {
    url: string
    alt: string
    by?: string
    source?: string
  }
  link?: string
  publisher?: string
  href: string
  readingTime: string
  tags: string[]
}
interface BlogPageProps {
  posts: PostPreview[]
}

const BlogPage = ({ posts }) => {
  return (
    <Layout>
      <Section
        css={{
          marginTop: '3rem'
        }}
      >
        <Heading
          // large
          className="pageHeading"
        >
          <h1>Blog</h1>
        </Heading>

        <ul css={{ margin: '1rem 0' }}>
          {posts.map(post => (
            <li css={{ marginTop: '4rem' }} key={post.href}>
              <Heading css={{ margin: '0.75rem 0' }}>
                <h2>
                  <Link href={post.href}>{post.title}</Link>
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
                  <span
                    css={{
                      fontWeight: 'bold'
                    }}
                  >{` on ${post.publisher}`}</span>
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
  const basePath = './src/posts/'
  const rawPosts = fs.readdirSync(basePath)

  let posts = []
  for (let item of rawPosts) {
    const filePath = path.join(basePath, item)
    const { ext, name } = path.parse(filePath)

    if (
      ext.startsWith('.md') &&
      ext !== 'index' &&
      !filePath.includes('posts/markdown-test')
    ) {
      try {
        const { attributes, ...rest } = fm<any>(
          fs.readFileSync(filePath, 'utf8')
        )

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
        .map(addDateFormattingToPost)
    }
  }
}
export default BlogPage
