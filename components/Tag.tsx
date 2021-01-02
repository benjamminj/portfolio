import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export enum TagType {
  LINK = 'link',
  TEXT = 'text',
}

export interface TagProps {
  tag: string
  type?: TagType
}

/**
 * Each `<Tag>` corresponds to a post `tag` value. All tags are links,
 * so clicking on one allows you to view all posts that have the same tag.
 */
export const Tag = ({ tag, type }: TagProps) => {
  const tagStyles =
    'inline-block p-1 -m-1 font-mono text-xs text-gray-600 no-underline rounded dark:text-gray-400 '

  const tagText = `#${tag}`

  if (type === TagType.TEXT) {
    return <span className={tagStyles}>{tagText}</span>
  }

  return (
    <Link href={`/tags/${tag}`}>
      <a
        className={clsx(
          tagStyles,
          'hover:text-gray-800 hover:bg-gray-100 hover:underline dark:hover:text-gray-50 dark:hover:bg-gray-900'
        )}
      >
        {tagText}
      </a>
    </Link>
  )
}
