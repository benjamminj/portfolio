import { Link } from '@remix-run/react'

/**
 * Each `<Tag>` corresponds to a post `tag` value. All tags are links,
 * so clicking on one allows you to view all posts that have the same tag.
 */
export const Tag = ({ tag }: { tag: string }) => {
  const tagText = `#${tag}`

  return (
    <Link
      to={`/tags/${tag}`}
      className="inline-block p-1 -m-1 font-mono text-xs text-gray-600 no-underline rounded dark:text-gray-400 hover:text-gray-800 hover:bg-gray-100 hover:underline dark:hover:text-gray-50 dark:hover:bg-gray-900"
    >
      {tagText}
    </Link>
  )
}
