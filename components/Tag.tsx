import React from 'react'
import { jsx } from '@emotion/core'
import { Text } from './Text'
import { spacing, palette } from '../styles/theme'
import { Link } from './Link'
/** @jsxImportSource @emotion/core */ jsx

export interface TagProps {
  tag: string
}

/**
 * Each `<Tag>` corresponds to a post `tag` value. All tags are links,
 * so clicking on one allows you to view all posts that have the same tag.
 */
export const Tag = ({ tag }: TagProps) => {
  return (
    <Link
      href="/tags/[tag]"
      as={`/tags/${tag}`}
      css={{
        textDecoration: 'none',
        marginRight: spacing.xs,
        padding: spacing.xxs,
      }}
    >
      <Text
        variant="caption"
        key={tag}
        css={{
          color: palette.neutral_700,

          ':hover': {
            color: palette.neutral_900,
            textDecoration: 'underline',
          },
        }}
      >
        #{tag}
      </Text>
    </Link>
  )
}
