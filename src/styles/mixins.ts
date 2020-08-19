import { css } from '@emotion/core'
import { fonts, colors, palette } from './theme'

// shared styles
export const headingStyle = () => css`
  font-family: ${fonts.secondary};
  margin: 1.25em 0;
  color: ${colors.primary};
`

export const highlightYPadding = '0.25em'
export const highlightXPadding = '0.25em'

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
export const createLinkStyles = ({
  color = palette.primary_500,
  hoverColor = palette.primary_600,
} = {}) => {
  return css({
    textDecoration: 'underline',
    borderRadius: 'var(--border-radius-s)',
    color,
    transition: 'all 50ms ease-in',
    fontWeight: 'bolder',

    /* When focusing links, make sure the box is slightly larger than the text */
    padding: linkPadding,
    margin: `-${linkPadding}`,

    ':active, :hover': {
      color: hoverColor,
    },
  })
}
