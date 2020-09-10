import { jsx } from '@emotion/core'
import { Text } from './Text'
import { spacing, palette } from '../styles/theme'
/** @jsx jsx */ jsx

export interface TagProps {
  tag: string
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <Text
      variant="caption"
      key={tag}
      css={{ marginRight: spacing.xs, color: palette.neutral_700 }}
    >
      #{tag}
    </Text>
  )
}
