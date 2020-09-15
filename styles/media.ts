import { Interpolation } from '@emotion/core'

// Keeping breakpoints in `rem` units allows them to scale
// as users scale their font size
export const breakpoints = {
  tablet: '30rem',
  desktop: '60rem',
}

export const above = {
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
}

type MediaQueryFunction = (styles: Interpolation) => Interpolation

export const aboveTablet: MediaQueryFunction = styles => {
  return { [above.tablet]: styles }
}

export const aboveDesktop: MediaQueryFunction = styles => {
  return { [above.desktop]: styles }
}
