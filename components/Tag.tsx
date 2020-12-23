import React from 'react'
import Link from 'next/link'

export interface TagProps {
  tag: string
}

/**
 * Each `<Tag>` corresponds to a post `tag` value. All tags are links,
 * so clicking on one allows you to view all posts that have the same tag.
 */
export const Tag = ({ tag }: TagProps) => {
  return (
    <Link href={`/tags/${tag}`}>
      <a className="inline-block p-1 -m-1 font-mono text-xs text-gray-600 no-underline rounded hover:text-gray-800 hover:bg-gray-100 hover:underline dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-900">
        #{tag}
      </a>
    </Link>
  )
}
