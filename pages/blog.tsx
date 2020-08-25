import { jsx } from '@emotion/core'
import { compareDesc, format } from 'date-fns'
import { GetStaticProps } from 'next'
import readingTime from 'reading-time'
import { getPostBySlug } from '../lib/getPostBySlug'
import { getPostFilePaths } from '../lib/getPostFilePaths'
import { slugifyPost } from '../lib/slugifyPost'
import { PostFrontmatter } from '../lib/types'
import { Heading, Layout, Link, Section } from '../src/components'
import { Text, textVariants } from '../src/components/Text'
import { palette, spacing } from '../src/styles/theme'
import { aboveScreenSm } from '../src/styles/media'
import { Tag } from '../src/components/Tag'
/** @jsx jsx */ jsx

type PostPreview = Pick<
  PostFrontmatter,
  'title' | 'description' | 'draft' | 'link' | 'publisher' | 'tags'
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
      <Section css={{ padding: 'var(--body-gutter)' }}>
        <Heading large className="pageHeading">
          <h1>
            <Text variant="h3">Blog</Text>
          </h1>
        </Heading>

        <ul css={{ margin: '1rem 0' }}>
          {posts.map(post => (
            <li
              css={[
                {
                  paddingTop: 12,
                  paddingBottom: 12,
                },
                aboveScreenSm({
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gridTemplateRows: 'auto auto',
                  gridColumnGap: 16,
                }),
              ]}
              key={post.href}
            >
              <div>
                <Text
                  css={{
                    fontVariantNumeric: 'tabular-nums',
                    color: palette.neutral_700,
                    verticalAlign: 'sub',
                  }}
                >
                  {post.date}
                </Text>
              </div>

              <h2>
                <Link
                  href="/blog/[slug]"
                  as={post.href}
                  css={{
                    textDecoration: 'none',
                    padding: 8,
                    margin: -8,
                    ':hover, :focus': {
                      background: palette.neutral_100,
                    },
                  }}
                >
                  <Text variant="subtitle">{post.title}</Text>
                </Link>
              </h2>

              {post.tags?.length > 0 && (
                <div css={{ gridRow: 2, gridColumn: 2 }}>
                  {post.tags?.map(tag => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              )}
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
        href: `/blog/${slug}`,
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
      date: format(p.date, 'yyyy-MM-dd'),
    }))

  return { props: { posts: sortedPosts } }
}

export default BlogPage
