import { ReactNode } from 'react'
import { darkMode } from '../styles/media'
import { palette, spacing } from '../styles/theme'
import { textMaxWidth } from '../styles/variables'
import { Box } from './Box'

const bgLight = palette.neutral_100
const bgDark = palette.neutral_900

interface BannerProps {
  children: ReactNode
}

export const Banner = ({ children }: BannerProps) => {
  return (
    <Box
      paddingTop="8xl"
      paddingBottom="xl"
      display="flex"
      minHeight={spacing['6xl']}
      alignItems="flex-end"
      css={[
        { backgroundColor: bgLight },
        darkMode({
          backgroundColor: bgDark,
        }),
      ]}
    >
      <div
        css={{
          width: textMaxWidth,
          margin: '0 auto',
          padding: spacing.gutter,
        }}
      >
        {children}
      </div>
    </Box>
  )
}
