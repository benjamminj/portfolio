import { css, Interpolation } from '@emotion/core'

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

type MediaQueryFunction = (styles: any) => Interpolation
// media queries
export const aboveScreenSm: MediaQueryFunction = styles => css`
  @media (min-width: 35rem) {
    ${styles};
  }
`

export const aboveTablet: MediaQueryFunction = styles => {
  return { [above.tablet]: styles }
}

export const aboveDesktop: MediaQueryFunction = styles => {
  return { [above.desktop]: styles }
}

export const aboveScreenMd: MediaQueryFunction = styles => css`
  @media (min-width: 50rem) {
    ${styles};
  }
`
