import { css } from '@emotion/core'
import { fonts, colors, palette } from './theme'

// shared styles
export const headingStyle = () => css`
  font-family: ${fonts.secondary};
  margin: 1.25em 0;
  color: ${colors.primary};
`

export const highlightYPadding = '0.25em'
export const highlightXPadding = '0.5em'

export const createHighlight = (
  background = palette.primary_100,
  foreground = 'inherit'
) => {
  return css({
    padding: `${highlightYPadding} ${highlightXPadding}`,
    margin: `-${highlightYPadding} 0`,
    backgroundColor: background,
    color: foreground,
    borderRadius: 6,
  })
}

export const createLinkStyles = ({
  color = palette.primary_500,
  highlight = palette.primary_100,
} = {}) => {
  const highlightStyles = createHighlight(highlight, color)

  return css`
    display: inline-block;
    position: relative;
    text-decoration: underline;
    line-height: 1;

    ${highlightStyles}

    transition: all 50ms ease-in;

    :active,
    :hover {
      background-color: ${color};
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
