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
  background = palette.neutral_100,
  foreground = 'inherit'
) => {
  return css({
    padding: `${highlightYPadding} ${highlightXPadding}`,
    margin: `-${highlightYPadding} 0`,
    backgroundColor: background,
    color: foreground,
  })
}

export const createLinkStyles = ({
  color = palette.neutral_700,
  inline = false,
} = {}) => {
  return css`
    position: relative;
    text-decoration: underline;

    /* Spacing around the link to handle hover styles */
    line-height: 1.5;
    padding: 0.25em;

    color: ${color};
    transition: all 50ms ease-in;

    :active,
    :hover {
      text-decoration-color: ${palette.white};
      color: ${palette.white};
      background-color: ${color};
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
