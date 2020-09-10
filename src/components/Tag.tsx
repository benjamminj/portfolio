import { jsx } from '@emotion/core'
import { Text } from './Text'
import { spacing, palette } from '../styles/theme'
import { Link } from './Link'
/** @jsx jsx */ jsx

export interface TagProps {
  tag: string
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <Link
      href={`/tags/${tag}`}
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
