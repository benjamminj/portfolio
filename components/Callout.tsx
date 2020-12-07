import { ReactNode } from 'react'
import { aboveTablet, darkMode } from '../styles/media'
import { palette, radius, spacing } from '../styles/theme'
import { Box } from './Box'
import { Text } from './Text'

export type CalloutVariant = 'success' | 'error' | 'warning' | 'info'

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  icon?: ReactNode
  heading?: ReactNode
  className?: string
}

interface ColorVariantConfig {
  light: {
    background: string
    border: string
    heading: string
  }
  dark: {
    background: string
    border: string
    heading: string
  }
  defaultIcon: ReactNode
}

const colorVariants: { [key in CalloutVariant]: ColorVariantConfig } = {
  success: {
    light: {
      background: palette.success_100,
      border: palette.success_200,
      heading: palette.success_900,
    },
    dark: {
      background: palette.success_700,
      border: palette.success_900,
      heading: palette.success_100,
    },
    defaultIcon: '✅',
  },
  error: {
    light: {
      background: palette.error_100,
      border: palette.error_200,
      heading: palette.error_900,
    },
    dark: {
      background: palette.error_700,
      border: palette.error_900,
      heading: palette.error_100,
    },
    defaultIcon: '🚨',
  },
  warning: {
    light: {
      background: palette.warning_100,
      border: palette.warning_300,
      heading: palette.warning_900,
    },
    dark: {
      background: palette.warning_700,
      border: palette.warning_900,
      heading: palette.warning_300,
    },
    defaultIcon: '🚧',
  },
  info: {
    light: {
      background: palette.neutral_100,
      border: palette.neutral_300,
      heading: palette.neutral_900,
    },
    dark: {
      background: palette.neutral_900,
      border: palette.neutral_900,
      heading: palette.white,
    },

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
      css={[
        {
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto min-content',
          gridColumnGap: spacing.m,
          gridRowGap: spacing.s,
          border: `2px solid ${config.light.border}`,
          borderRadius: radius.l,
          backgroundColor: config.light.background,
        },
        aboveTablet({
          gridRowGap: spacing.xxs,
        }),
        darkMode({
          borderColor: config.dark.border,
          backgroundColor: config.dark.background,
        }),
      ]}
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
        <Text
          variant="subtitle"
          css={[
            { color: config.light.heading },
            darkMode({
              color: config.dark.heading,
            }),
          ]}
        >
          {heading}
        </Text>
      )}

      <Box
        css={[
          {
            gridColumn: '1 / 3',
            '> p': { margin: 0 },
          },
          aboveTablet({
            gridColumn: 2,
          }),
        ]}
      >
        {children}
      </Box>
    </Box>
  )
}
