import { jsx } from '@emotion/core'
import { compareAsc, format, compareDesc } from 'date-fns'
import fm from 'front-matter'
import fs from 'fs'
import { GetStaticProps } from 'next'
import path from 'path'
import readingTime from 'reading-time'
import { Heading, Layout, Link, Section } from '../src/components'
import { getPostBySlug } from '../lib/getPostBySlug'
import { slugifyPost } from '../lib/slugifyPost'
import { getPostFilePaths } from '../lib/getPostFilePaths'
import { PostFrontmatter } from '../lib/types'
/** @jsx jsx */ jsx

type PostPreview = Pick<
  PostFrontmatter,
  'title' | 'description' | 'draft' | 'link' | 'publisher'
> & {
  /** The date that the post was first published. */
  date: string
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
      <Section
        css={{
          marginTop: '3rem',
          padding: 'var(--body-gutter)',
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
                  fontWeight: 'normal',
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
  const postFiles = getPostFilePaths()

  let posts = []

  for (let postFile of postFiles) {
    try {
      const slug = slugifyPost(postFile)
      const { frontmatter, body } = getPostBySlug(slug)

      // Don't add the post to the list if it's a WIP
      if (frontmatter.draft) continue

      const postData = {
        ...frontmatter,
        href: `blog/${slug}`,
        readingTime: readingTime(body).text,
      }

      posts.push(postData)
    } catch (error) {
      console.log(`Error reading frontmatter of ${postFile}`, error)
    }
  }

  const sortedPosts = posts
    .sort((a, b) => compareDesc(a.date, b.date))
    .map(p => ({
      ...p,
      // We add the date formatting _after_ sorting so that we can accurately sort
      // by date.
      date: format(p.date, 'MM-dd-yyyy'),
    }))

  return { props: { posts: sortedPosts } }
}

export default BlogPage
