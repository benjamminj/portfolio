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
  heading?: ReactNode
}

const calloutColorScheme = {
  background: palette.neutral_100,
  border: palette.neutral_300,
  heading: palette.neutral_700,
}

export const Callout = ({
  variant = 'info',
  icon = '🤔',
  children,
  heading = null,
}: CalloutProps) => {
  return (
    <Box
      paddingY="xl"
      paddingX="l"
      display="grid"
      css={{
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto min-content',
        gridColumnGap: spacing.m,
        gridRowGap: spacing.xs,
        border: `2px solid ${calloutColorScheme.border}`,
        borderRadius: 'var(--border-radius-l)',
        backgroundColor: calloutColorScheme.background,
      }}
    >
      <Text
        variant="h4"
        css={{
          height: spacing.l,
          width: spacing.l,
        }}
      >
        {icon}
      </Text>

      {heading && <Text variant="subtitle">{heading}</Text>}

      <Box css={{ gridColumn: 2 }}>{children}</Box>
    </Box>
  )
}
