import { compareDesc, format } from 'date-fns'
import { GetStaticProps } from 'next'
import { getPostBySlug } from '../lib/getPostBySlug'
import { getPostFilePaths } from '../lib/getPostFilePaths'
import { slugifyPost } from '../lib/slugifyPost'
import { PostFrontmatter } from '../lib/types'
import { LayoutV2 } from '../components/Layout'
import { Tag } from '../components/Tag'
import { PostListItem } from '../components/PostListItem'

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

/** Displays a list of all published writings. */
const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <LayoutV2 title="Writing" subtitle="subtitle TODO">
      <ul>
        <div className="space-y-2">
          {posts.map(post => {
            return (
              <li key={post.href} className="w-full">
                <PostListItem post={post} />
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
