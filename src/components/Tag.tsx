import { jsx } from '@emotion/core'
import { Text } from './Text'
/** @jsx jsx */ jsx

export interface TagProps {
  tag: string
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <Text variant="caption" key={tag} css={{ marginRight: 8 }}>
      #{tag}
    </Text>
  )
}
