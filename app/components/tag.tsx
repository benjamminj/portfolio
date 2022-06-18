import { Link } from '@remix-run/react'
import clsx from 'clsx'

type TagVariant = 'strong' | 'default'
const tagColorMap: Record<TagVariant, string> = {
  default:
    'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-900',
  strong:
    'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-50 dark:hover:bg-gray-900',
}
/**
 * Each `<Tag>` corresponds to a post `tag` value. All tags are links,
 * so clicking on one allows you to view all posts that have the same tag.
 */
export const Tag = ({
  tag,
  variant = 'default',
}: {
  tag: string
  variant?: TagVariant
}) => {
  const tagText = `#${tag}`

  return (
    <Link
      to={`/tags/${tag}`}
      className={clsx(
        'inline-block p-1 -m-1 font-mono text-xs no-underline hover:underline',
        tagColorMap[variant]
      )}
    >
      {tagText}
    </Link>
  )
}
