import { jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { Box } from './Box'
import { Text } from './Text'
import { spacing, palette } from '../styles/theme'
/** @jsx jsx */ jsx

interface CalloutProps {
  children: ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info'
  icon?: ReactNode
}

export const Callout = ({
  variant = 'info',
  icon = '🤔',
  children,
}: CalloutProps) => {
  return (
    <Box
      paddingY="xl"
      paddingX="l"
      display="flex"
      css={{
        border: '2px solid black',
        borderRadius: 'var(--border-radius-l)',
      }}
    >
      <Box paddingRight="m">
        <Text
          variant="h4"
          css={{
            height: spacing.l,
            width: spacing.l,
            lineHeight: 1,
          }}
        >
          {icon}
        </Text>
      </Box>
      {children}
    </Box>
  )
}
