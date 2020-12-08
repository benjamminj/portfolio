import { darkMode } from '../styles/media'
import { palette } from '../styles/theme'

export const PageWrapper = ({ children }) => {
  return (
    <div
      css={[
        {
          minHeight: '100vh',
          backgroundColor: palette.white,
        },
        darkMode({
          color: palette.white,
          backgroundColor: palette.neutral_800,
        }),
      ]}
    >
      {children}
    </div>
  )
}
