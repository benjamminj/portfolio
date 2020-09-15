import { jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { palette, spacing } from '../../styles/theme'
import { Box } from './Box'
import { Text } from './Text'
/** @jsx jsx */ jsx

export type CalloutVariant = 'success' | 'error' | 'warning' | 'info'

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  icon?: ReactNode
  heading?: ReactNode
  className?: string
}

interface ColorVariantConfig {
  background: string
  border: string
  heading: string
  defaultIcon: ReactNode
}

const colorVariants: { [key in CalloutVariant]: ColorVariantConfig } = {
  success: {
    background: palette.success_100,
    border: palette.success_200,
    heading: palette.success_900,
    defaultIcon: '✅',
  },
  error: {
    background: palette.error_100,
    border: palette.error_200,
    heading: palette.error_900,
    defaultIcon: '🚨',
  },
  warning: {
    background: palette.warning_100,
    border: palette.warning_300,
    heading: palette.warning_900,
    defaultIcon: '🚧',
  },
  info: {
    background: palette.neutral_100,
    border: palette.neutral_300,
    heading: palette.neutral_900,
    defaultIcon: '💬',
  },
}

export const Callout = ({
  variant = 'info',
  icon,
  children,
  heading = null,
  ...props
}: CalloutProps) => {
  const config = colorVariants[variant]
  return (
    <Box
      paddingY="xl"
      paddingX="l"
      display="grid"
      css={{
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto min-content',
        gridColumnGap: spacing.m,
        gridRowGap: spacing.xxs,
        border: `2px solid ${config.border}`,
        borderRadius: 'var(--border-radius-l)',
        backgroundColor: config.background,
      }}
      {...props}
    >
      <Text
        variant="h4"
        css={{
          height: spacing.l,
          width: spacing.l,
        }}
      >
        {icon || config.defaultIcon}
      </Text>

      {heading && (
        <Text variant="subtitle" css={{ color: config.heading }}>
          {heading}
        </Text>
      )}

      <Box css={{ gridColumn: 2, paddingTop: spacing.xxs }}>{children}</Box>
    </Box>
  )
}
