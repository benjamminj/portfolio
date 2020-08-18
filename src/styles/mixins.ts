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
    borderRadius: 'var(--border-radius-s)',
  })
}

export const linkPadding = '0.25em'
export const createLinkStyles = ({ color = palette.primary_500 } = {}) => {
  return css`
    position: relative;
    text-decoration: underline;

    /* Spacing around the link to handle hover styles */
    line-height: 1.5;
    padding: ${linkPadding};
    border-radius: var(--border-radius-s);

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
