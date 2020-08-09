import { css } from '@emotion/core'
import { fonts, colors, palette } from './theme'

// shared styles
export const headingStyle = () => css`
  font-family: ${fonts.secondary};
  margin: 1.25em 0;
  color: ${colors.primary};
`

export const createLinkStyles = (color = palette.primary_500) => {
  const borderSize = '2px'

  return css`
    display: inline-block;
    position: relative;
    text-decoration: underline;
    color: ${color};
    padding: 0 4px;
    margin: 0 -4px;
    border-radius: 4px;
    transition: all 50ms ease-in;

    :active,
    :hover {
      background: ${color};
      color: ${colors.white};
    }
  `
}

export const linkStyle = (
  color = colors.accent1[700],
  highlightColor = colors.accent1[100]
) => {
  const borderSize = '2px'

  return css`
    text-decoration: none;
    border-bottom: ${borderSize} solid ${color};
    color: ${color};
    padding-top: ${borderSize};
    transition: all 50ms ease-in;

    &:active,
    &:hover {
      background: ${highlightColor};
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
