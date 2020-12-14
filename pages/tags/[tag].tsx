import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getPostBySlug } from '../../lib/getPostBySlug'
import { getPostFilePaths } from '../../lib/getPostFilePaths'
import { slugifyPost } from '../../lib/slugifyPost'
import { PostFrontmatter } from '../../lib/types'
import { Layout } from '../../components/Layout'
import { compareDesc, format } from 'date-fns'
import { PostListItem } from '../../components/PostListItem'

type PostPreview = Pick<PostFrontmatter, 'title' | 'tags'> & {
  date: string
  href: string
}

interface TagPageProps {
  posts: PostPreview[]
  tag: string
}

interface TagPageParams extends ParsedUrlQuery {
  tag: string
}

const TagPage = ({ tag, posts }: TagPageProps) => {
  return (
    <Layout title={`#${tag}`}>
      <ul>
        {posts.map(post => (
          <li key={post.href}>
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postFiles = getPostFilePaths()

  const allTags = {}

  for (const filePath of postFiles) {
    const { frontmatter } = getPostBySlug(slugifyPost(filePath))

    if (!frontmatter.tags) continue

    for (const tag of frontmatter.tags) {
      allTags[tag] = tag
    }
  }

  return {
    paths: Object.values(allTags).map((tag: string) => ({
      params: { tag },
    })),
    fallback: false,
  }
}

type GetTagPageStaticProps = GetStaticProps<TagPageProps, TagPageParams>
export const getStaticProps: GetTagPageStaticProps = async ctx => {
  const { tag } = ctx.params
  const postFiles = getPostFilePaths()

  const matchingPosts = []
  for (const filePath of postFiles) {
    const slug = slugifyPost(filePath)
    const { frontmatter } = getPostBySlug(slug)

    const isMatchingTag = frontmatter.tags?.includes(tag)

    if (isMatchingTag) {
      matchingPosts.push({ ...frontmatter, href: `/blog/${slug}` })
    }
  }

  const sortedPosts = matchingPosts
    .sort((a, b) => compareDesc(a.date, b.date))
    .map(p => ({ ...p, date: format(p.date, 'yyyy-MM-dd') }))

  return { props: { tag, posts: sortedPosts } }
}

export default TagPage
