import { ReactNode } from 'react'
import { PostFrontmatter } from '../lib/types'
import { Tag, TagType } from './Tag'

type PostPreview = Pick<PostFrontmatter, 'title' | 'tags'> & {
  /** The `href` to the actual post itself */
  href: string
  date: string
}

interface PostListItemProps {
  post: PostPreview
  tagComponent?: ({ tag }: { tag: string }) => JSX.Element
}

export const PostListItem = ({
  post,
  tagComponent: TagComponent = Tag,
}: PostListItemProps) => {
  return (
    <div className="relative p-4 -mx-4 hover:bg-gray-100 rounded-2xl dark:hover:bg-gray-900 dark:hover:bg-opacity-50">
      <div className="space-y-1 md:flex md:space-y-0 md:space-x-4">
        <time className="text-gray-500 dark:text-gray-400 flex items-end flex-shrink-0 font-mono text-sm md:h-8 md:pt-1 md:pb-1.5 tabular-nums leading-none">
          {post.date}
        </time>

        <div>
          <h2 className="text-2xl">
            <a
              href={post.href}
              title={post.title}
              className="font-semibold text-gray-800 no-underline hover:text-gray-800 dark:text-gray-200 dark:hover:text-white hover:underline before:empty-content before:absolute before:inset-0"
            >
              {post.title}
            </a>
          </h2>

          {post.tags?.length > 0 && (
            <ul className="relative z-10 flex flex-wrap -ml-2">
              {post.tags.map(tag => (
                <li key={tag} className="ml-2">
                  <TagComponent tag={tag} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
