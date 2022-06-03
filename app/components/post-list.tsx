import type { Post } from '~/lib/posts.server'
import { PostListItem } from './post-list-item'

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li className="w-full" key={post.slug}>
          <PostListItem post={post} />
        </li>
      ))}
    </ul>
  )
}
