import { css } from '@emotion/core'
import { fonts, colors } from '../styles/theme'

// shared styles
export const headingStyle = () => css`
  font-family: ${fonts.secondary};
  margin: 1.25em 0;
  color: ${colors.primary};
`

export const linkStyle = (color = colors.accent1[700]) => {
  const borderSize = '1px'

  return css`
    text-decoration: none;
    border-bottom: ${borderSize} solid ${color};
    color: ${color};
    padding-top: ${borderSize};
    transition: all 50ms ease-in;

    &:active,
    &:hover {
      background: ${color};
      color: ${colors.white};
    }
  `
}

// media queries
export const aboveScreenSm = styles => css`
  @media (min-width: 35rem) {
    ${styles};
  }
`

export const aboveScreenMd = styles => css`
  @media (min-width: 50rem) {
    ${styles};
  }
`
